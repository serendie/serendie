import type { Tokens } from "@pandacss/dev";
import tokens from "@serendie/design-token";

const { sd } = tokens;

export const extendedTokens: Tokens = {
  colors: {
    globalMenu: { value: sd.reference.color.scale.blue[900] },
  },
};

export const extendedHisuiTokens: Tokens = {
  colors: {
    primary: { value: sd.reference.color.scale.green[500] },
    accent: { value: sd.reference.color.scale.orange[400] },
    background: { value: sd.reference.color.scale.gray[100] },
    text: { value: sd.reference.color.scale.gray[900] },
  },
};
