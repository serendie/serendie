import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

import Comp_A from "../assets/illustrations/composition-a/large.svg?react";
import Comp_B from "../assets/illustrations/composition-b/large.svg?react";
import Comp_C from "../assets/illustrations/composition-c/large.svg?react";
import Comp_D from "../assets/illustrations/composition-d/large.svg?react";

type type = "A" | "B" | "C" | "D";

const illustMap = {
  A: Comp_A,
  B: Comp_B,
  C: Comp_C,
  D: Comp_D,
};

type IndexPageHeaderProps = {
  title: string;
  description?: string;
  illustType: type;
  illustSize?: "large" | "small";
};

const IndexPageHeader_ = ({
  illustType,
  title,
  description,
  illustSize = "small",
}: IndexPageHeaderProps) => {
  const Illust = illustMap[illustType];
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "minmax(auto, 1fr) auto",
        alignItems: "center",
        gap: "sd.reference.dimension.scale.12",
        mb: "sd.reference.dimension.scale.17",
        color: "web.system.color.component.onSurface",
        smDown: {
          gridTemplateColumns: "1fr",
          gap: "sd.system.dimension.spacing.threeExtraLarge",
          mt: "sd.system.dimension.spacing.twoExtraLarge",
          mb: "sd.system.dimension.spacing.fiveExtraLarge",
        },
      })}
    >
      <div>
        <h2
          className={css({
            textStyle: "sd.system.typography.display.medium_compact",
            mdDown: {
              textStyle: "sd.system.typography.display.small_compact",
            },
          })}
        >
          {title}
        </h2>
        {description && <p>{description}</p>}
      </div>
      <div
        className={css({
          "&>svg": {
            width: illustSize === "large" ? "644px" : "auto",
            height: "auto",
          },
        })}
      >
        <Illust />
      </div>
    </div>
  );
};

export const IndexPageHeader = styled(IndexPageHeader_);
