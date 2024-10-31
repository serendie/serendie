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
  subTitle?: string;
  description?: string;
  lastUpdated?: string;
  illustType?: type;
  illustSize?: "large" | "small";
};

const IndexPageHeader_ = ({
  illustType,
  title,
  subTitle,
  description,
  lastUpdated,
  illustSize = "small",
}: IndexPageHeaderProps) => {
  const Illust = illustType ? illustMap[illustType] : null;
  const lastUpdateDate = lastUpdated ? new Date(lastUpdated) : undefined;

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "minmax(auto, 1fr) auto",
        alignItems: "center",
        gap: "sd.reference.dimension.scale.12",
        mb: "sd.reference.dimension.scale.17",
        color: "web.system.color.component.onSurface",
        mdDown: {
          gridTemplateColumns: "1fr",
          gap: "sd.system.dimension.spacing.threeExtraLarge",
          mt: "sd.system.dimension.spacing.twoExtraLarge",
          mb: "sd.system.dimension.spacing.fiveExtraLarge",
        },
      })}
    >
      <div>
        <h1
          className={css({
            fontWeight: "sd.reference.typography.fontWeight.regular",
            textStyle: "sd.system.typography.display.medium_compact",
            fontSize: illustSize === "small" ? "48px" : undefined,
            mdDown: {
              textStyle: "sd.system.typography.display.small_compact",
              fontSize: illustSize === "large" ? "42px" : undefined,
            },
          })}
        >
          {title}
          {subTitle && (
            <span
              className={css({
                display: "block",
                fontSize: "sd.reference.typography.scale.compact.large",
                fontWeight: "sd.reference.typography.fontWeight.bold",
              })}
            >
              {subTitle}
            </span>
          )}
        </h1>
        {description && (
          <p
            className={css({
              my: "sd.system.dimension.spacing.extraLarge",
            })}
          >
            {description}
          </p>
        )}
        {lastUpdated && (
          <p
            className={css({
              my: "sd.system.dimension.spacing.extraLarge",
              fontSize: "12px",
              color: "sd.reference.color.scale.gray.600",
            })}
          >
            更新 {lastUpdateDate?.toLocaleDateString("ja-JP")}
          </p>
        )}
      </div>
      <div
        className={css({
          "&>svg": {
            width: illustSize === "large" ? "644px" : "auto",
            height: "auto",
          },
        })}
      >
        {Illust && <Illust />}
      </div>
    </div>
  );
};

export const IndexPageHeader = styled(IndexPageHeader_);
