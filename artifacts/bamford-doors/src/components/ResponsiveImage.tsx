import type { ImgHTMLAttributes } from 'react';

const photoDimensions: Record<string, [number, number]> = {
  '/media/wood-effect.webp': [1400, 1050],
  '/media/grp.webp': [1400, 1050],
  '/media/csr-social-value-poster.jpg': [1280, 720],
  '/media/csr-defib-poster.jpg': [1280, 720],
  '/media/factory-hero-poster.jpg': [1500, 998],
  '/media/door-entry-control.jpg': [1205, 602],
  '/media/louvered-doors.jpg': [1200, 1600],
  '/media/wood-effect-product.jpg': [773, 916],
  '/media/screens-curtain-walling.jpg': [839, 1125],
  '/media/screens-curtain-walling-02.jpg': [797, 1000],
  '/media/screens-curtain-walling-03.jpg': [749, 1090],
  '/media/screens-curtain-walling-04.jpg': [812, 1133],
  '/media/secondary-security-doors.jpg': [983, 1124],
  '/media/automatic-operator-drive.jpg': [1024, 636],
  '/media/mailbox-entrance-01.jpg': [775, 1057],
  '/media/mailbox-entrance-02.jpg': [681, 995],
  '/media/mailbox-entrance-03.jpg': [1000, 973],
  '/media/mailbox-entrance-04.jpg': [791, 977],
  '/media/block-address-signs-entrance.jpg': [765, 1034],
  '/media/block-address-signs-detail.jpg': [792, 1067],
  '/media/mailbox-product-card.jpg': [681, 995],
  '/media/bamford-project-team-reviewing-workshop.jpg': [2000, 1331],
  '/media/bamford-aluminium-profiles-workshop.jpg': [2000, 1331],
  '/media/thermal-door-card.webp': [773, 827],
  '/media/aluminium-modular/context-entrance-01.jpg': [794, 838],
  '/media/aluminium-modular/context-entrance-02.jpg': [793, 918],
  '/media/aluminium-modular/context-entrance-03.jpg': [795, 893],
  '/media/thermally-broken/hero-door.jpg': [773, 827],
  '/media/wood-effect/entrance-01.jpeg': [783, 855],
  '/media/wood-effect/entrance-02.jpeg': [596, 1010],
  '/media/wood-effect/entrance-03.jpeg': [773, 916],
  '/media/wood-effect/entrance-04.jpeg': [806, 1009],
  '/media/wood-effect/entrance-05.jpeg': [787, 936],
  '/media/hmo/entrance-01.jpg': [1148, 1718],
  '/media/hmo/entrance-02.jpg': [1108, 1732],
  '/media/hmo/entrance-03.jpg': [1158, 1560],
  '/media/hmo/entrance-04.jpg': [914, 1476],
  '/media/grp-doors/hero.webp': [1764, 1390],
  '/media/grp-doors/entrance-01.webp': [1162, 1470],
  '/media/grp-doors/entrance-02.webp': [1196, 1630],
  '/media/grp-doors/entrance-03.webp': [1610, 1202],
  '/media/grp-doors/entrance-04.webp': [1620, 970],
  '/media/grp-doors/entrance-05.webp': [1242, 904],
  '/media/grp-doors/entrance-06.webp': [1624, 1516],
  '/media/stock-condition-surveys/communal-entrance-exterior.jpg': [1500, 1001],
  '/media/stock-condition-surveys/housing-estate-aerial-wide.jpg': [1500, 842],
  '/media/stock-condition-surveys/housing-estate-aerial-close.jpg': [1500, 842],
  '/media/stock-condition-surveys/housing-estate-field-road.jpg': [1500, 842],
  '/media/stock-condition-surveys/high-rise-residential-block.webp': [1001, 1500],
  '/media/warranties/red-door-frames-in-production.jpg': [998, 1500],
  '/media/warranties/door-frame-assembly-at-workshop.jpg': [998, 1500],
  '/media/warranties/grey-aluminium-entrance.jpg': [794, 838],
  '/media/warranties/blue-grp-entrance-door.jpg': [1620, 970],
  '/media/resident-involvement/resident-man-pink-jumper-outdoors.jpg': [1024, 576],
  '/media/resident-involvement/resident-woman-outside-building.jpg': [1024, 683],
};

const candidateWidths = [320, 640, 960, 1280, 1600];

function responsiveSrcSet(src: string, dimensions: [number, number]) {
  const widths = candidateWidths.filter((width) => width < dimensions[0]);
  const candidates = widths.map((width) => {
    const responsivePath = src.replace('/media/', '/media/responsive/');
    return `${responsivePath}.${width}.webp ${width}w`;
  });

  if (!candidateWidths.includes(dimensions[0])) {
    candidates.push(`${src} ${dimensions[0]}w`);
  }
  return candidates.join(', ');
}

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function ResponsiveImage({ src, srcSet, sizes, width, height, decoding, ...props }: ResponsiveImageProps) {
  const mediaPath = typeof src === 'string' ? src.indexOf('/media/') : -1;
  const sourceKey = mediaPath >= 0 ? (src as string).slice(mediaPath) : src;
  const dimensions = typeof sourceKey === 'string' ? photoDimensions[sourceKey] : undefined;
  const responsive = dimensions ? responsiveSrcSet(src as string, dimensions) : undefined;

  return (
    <img
      {...props}
      src={src}
      srcSet={responsive || srcSet}
      sizes={responsive ? (sizes || '(max-width: 760px) 100vw, 50vw') : sizes}
      width={dimensions?.[0] ?? width}
      height={dimensions?.[1] ?? height}
      decoding={decoding ?? 'async'}
    />
  );
}
