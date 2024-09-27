import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

type IndexPageHeaderProps = {
  image: ImageMetadata;
  title: string;
};

const IndexPageHeader_ = ({ image, title }: IndexPageHeaderProps) => (
  <div
    className={css({
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "sd.reference.dimension.scale.12",
      mb: "sd.reference.dimension.scale.18",
      mdDown: {
        gridTemplateColumns: "1fr",
        gap: "sd.reference.dimension.scale.threeExtraLarge",
      },
    })}
  >
    <h2
      className={css({
        color: "sd.reference.color.scale.blue.900",
        textStyle: "sd.system.typography.display.medium_compact",
      })}
    >
      {title}
    </h2>
    <img
      src={image.src}
      alt={""}
      width={image.width}
      height={image.height}
      className={css({
        maxWidth: "100%",
        height: "auto",
      })}
    />
  </div>
);

export const IndexPageHeader = styled(IndexPageHeader_);
