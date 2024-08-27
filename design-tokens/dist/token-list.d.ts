/**
 * Do not edit directly
 * Generated on Tue, 27 Aug 2024 01:50:00 GMT
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
