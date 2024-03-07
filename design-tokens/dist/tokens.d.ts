/**
 * Do not edit directly
 * Generated on Thu, 07 Mar 2024 01:40:29 GMT
 */

export default tokens;

declare interface DesignToken {
  value: any;
  name?: string;
  comment?: string;
  themeable?: boolean;
  attributes?: {
    category?: string;
    type?: string;
    item?: string;
    subitem?: string;
    state?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

declare const tokens: {
  "color": {
    "text": {
      "primary": DesignToken
    },
    "purple": {
      "0": DesignToken,
      "1": DesignToken,
      "2": DesignToken,
      "3": DesignToken,
      "4": DesignToken
    }
  },
  "dimension": {
    "scale": {
      "0": DesignToken,
      "1": DesignToken,
      "2": DesignToken,
      "3": DesignToken,
      "4": DesignToken
    }
  }
}
