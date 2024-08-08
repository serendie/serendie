/**
 * Do not edit directly
 * Generated on Thu, 08 Aug 2024 03:31:59 GMT
 */


export default tokens;

type value = string | number | Record<string, string | number>;

interface Token {
    path: string[];
    key: string;
    type: string;
    value: value;
    originalValue: value;
}

declare const tokens: Token[];
