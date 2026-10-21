import { Router, type IRouter } from "express";
import { rateLimit } from "express-rate-limit";
import { db, inquiriesTable } from "@workspace/db";
import {
  CreateInquiryBody,
  CreateInquiryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

router.post("/inquiries", inquiryLimiter, async (req, res): Promise<void> => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      {
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.map(String),
          code: issue.code,
        })),
      },
      "Rejected invalid enquiry",
    );
    res
      .status(400)
      .json({ error: "Please check the required details and try again." });
    return;
  }

  try {
    const [saved] = await db
      .insert(inquiriesTable)
      .values(parsed.data)
      .returning({
        id: inquiriesTable.id,
        createdAt: inquiriesTable.createdAt,
      });

    const receipt = CreateInquiryResponse.parse({
      id: saved.id,
      createdAt: saved.createdAt,
      message: "Thank you. Your enquiry has been received.",
    });
    res.status(201).json(receipt);
  } catch (err) {
    req.log.error({ err }, "Could not save website enquiry");
    res.status(500).json({
      error: "We could not save your enquiry. Please try again.",
    });
  }
});

export default router;
