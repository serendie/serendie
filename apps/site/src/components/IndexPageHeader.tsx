import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

type IndexPageHeaderProps = {
  image: ImageMetadata;
  title: string;
  description?: string;
};

const IndexPageHeader_ = ({
  image,
  title,
  description,
}: IndexPageHeaderProps) => (
  <div
    className={css({
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "sd.reference.dimension.scale.12",
      mb: "sd.reference.dimension.scale.18",
      color: "web.system.color.component.background.onSurface",
      mdDown: {
        gridTemplateColumns: "1fr",
        gap: "sd.reference.dimension.scale.threeExtraLarge",
      },
    })}
  >
    <div>
      <h2
        className={css({
          textStyle: "sd.system.typography.display.medium_compact",
        })}
      >
        {title}
      </h2>
      {description && <p>{description}</p>}
    </div>
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
