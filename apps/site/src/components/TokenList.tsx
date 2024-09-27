import type tokens from "@serendie/design-token/token-list";
import { IconButton, Search } from "@serendie/ui";
import { css } from "styled-system/css";
import { Box, Circle, Flex, styled } from "styled-system/jsx";
import React, { useCallback, useState } from "react";

interface TokenList {
  tokens: typeof tokens;
}

type Tokens = typeof tokens;
type Token = Tokens[number];

const Table = styled("table");
const Td = styled("td");
const Span = styled("span");
const Th = styled("th", {
  base: {
    fontFamily: "var(--global-font-mono)",
    textAlign: "left",
    color: "sd.reference.color.scale.gray.400",
    py: "sd.system.dimension.spacing.medium",
    borderBottom: "1px solid",
    borderColor: "sd.reference.color.scale.gray.200",
  },
});

export function TokenList({ tokens }: TokenList) {
  const [keyword, setKeyword] = useState("");

  const filteredTokens = tokens.filter((token) => {
    return token.key.toLowerCase().includes(keyword.toLowerCase());
  });

  const types = [...new Set(filteredTokens.map((token) => token.type))];

  return (
    <div>
      <div>
        <Search
          onInputValueChange={(e) => setKeyword(e.inputValue)}
          placeholder="Search tokens"
          items={[]}
        />
      </div>
      <Table
        tableLayout="fixed"
        mt="sd.system.dimension.spacing.extraLarge"
        fontSize={"sd.reference.typography.scale.expanded.twoExtraSmall"}
      >
        <thead>
          <tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, i) => (
            <>
              <tr key={i}>
                <td colSpan={2}>
                  <h2
                    className={css({
                      textStyle: "sd.system.typography.title.small_expanded",
                      pt: "sd.system.dimension.spacing.threeExtraLarge",
                      pb: "sd.system.dimension.spacing.small",
                    })}
                    style={{ textTransform: "capitalize" }}
                  >
                    {type}
                  </h2>
                </td>
              </tr>
              <List
                tokens={filteredTokens.filter((token) => token.type === type)}
              />
            </>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

interface ListByTYpeProps {
  tokens: Tokens;
}

const List: React.FC<ListByTYpeProps> = ({ tokens }) => {
  return (
    <>
      {tokens.map((token, i) => (
        <tr key={i}>
          <Td
            valign="top"
            title={token.key}
            py="sd.system.dimension.spacing.small"
            pr="sd.system.dimension.spacing.fiveExtraLarge"
            borderBottom={"1px solid"}
            borderColor={"sd.reference.color.scale.gray.200"}
          >
            <PathSpan path={token.path} />
          </Td>
          <Values token={token} />
        </tr>
      ))}
    </>
  );
};

interface ValuesProps {
  token: Token;
}

const Values: React.FC<ValuesProps> = ({ token }) => {
  const { originalValue, value } = token;
  return (
    <Td
      valign="top"
      py="sd.system.dimension.spacing.extraSmall"
      borderBottom={"1px solid"}
      borderColor={"sd.reference.color.scale.gray.200"}
    >
      <Flex
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"sd.reference.dimension.scale.3"}
      >
        {typeof originalValue === "object" ? (
          Object.keys(originalValue).map((key, i) => (
            <Box
              key={i}
              display="flex"
              alignItems={"center"}
              gap={"sd.reference.dimension.scale.3"}
            >
              <Box color={"sd.system.color.component.onSurface"}>{key}: </Box>
              <ReferenceValue
                token={token}
                originalValue={originalValue[key].toString()}
                value={
                  typeof value === "object" ? value[key]?.toString() : undefined
                }
              />
            </Box>
          ))
        ) : (
          <ReferenceValue
            token={token}
            originalValue={originalValue.toString()}
            value={token.value.toString()}
          />
        )}
      </Flex>
    </Td>
  );
};

const ReferenceValue: React.FC<{
  token: Token;
  originalValue: string;
  value?: string;
}> = ({ token, originalValue, value }) => {
  const isRef =
    originalValue.startsWith("{") &&
    originalValue.endsWith("}") &&
    originalValue.includes("reference");

  return (
    <Flex flexDirection="column" alignItems={"flex-start"}>
      {token.type === "color" && (
        <ColorName
          name={isRef ? originalValue.toString() : token.key}
          color={token.value.toString()}
        />
      )}
      <Code>
        {originalValue.replace(/[(^{)(}$)]/g, "")}
        {isRef && value && <>({value})</>}
      </Code>
    </Flex>
  );
};

const PathSpan: React.FC<{ path: string[] }> = ({ path }) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(path.join("."));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [path]);
  return (
    <Box
      pos={"relative"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      cursor={"pointer"}
    >
      <code>
        {path.map((p, i) => (
          <Span
            key={i}
            color={
              i < path.length - 1
                ? "sd.system.color.component.onSurfaceVariant"
                : "sd.system.color.component.onSurface"
            }
          >
            <span>{p}</span>
            {i < path.length - 1 && <span>.</span>}
          </Span>
        ))}
      </code>

      {hover && (
        <Span
          position={"relative"}
          display={"inline-flex"}
          alignItems={"center"}
          pos={"absolute"}
          translate={"5px -25%"}
          fontSize={"sd.reference.typography.scale.twoExtraSmall"}
        >
          <IconButton
            size={"small"}
            styleType="ghost"
            shape="rectangle"
            icon="clipboard_copy"
            onClick={handleClick}
          />
          {copied && (
            <Span
              p={"sd.system.dimension.spacing.twoExtraSmall"}
              pl={0}
              bgColor={"sd.reference.color.scale.white.1000"}
              color={"sd.reference.color.scale.gray.800"}
            >
              Copied
            </Span>
          )}
        </Span>
      )}
    </Box>
  );
};

const ColorName: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => {
  const slitted = name.replace(/[{}]/g, "").split(".");
  const colorNumber = slitted.pop();
  const colorName = slitted.pop();

  return (
    <Flex
      py="sd.system.dimension.spacing.twoExtraSmall"
      alignItems="center"
      gap="sd.system.dimension.spacing.twoExtraSmall"
    >
      <Circle
        size={16}
        display={"inline-block"}
        outline={"1px solid"}
        style={{
          backgroundColor: color,
          // TODO: ここでtokenのキーを指定するのが難しいので回避策を考える
          outlineColor: color === "#FFFFFF" ? "#CED5D9" : color,
        }}
      />
      <Span>
        <Span
          color="sd.system.color.component.onSurfaceVariant"
          style={{ textTransform: "capitalize" }}
        >
          {colorName}
          <Span p="sd.system.dimension.spacing.twoExtraSmall">/</Span>
        </Span>
        <code
          className={css({
            color: "sd.system.color.component.onSurface",
          })}
        >
          {colorNumber}
        </code>
      </Span>
    </Flex>
  );
};

const Code = styled("code", {
  base: {
    borderRadius: "sd.system.dimension.radius.small",
    bg: "sd.reference.color.scale.gray.100",
    py: "sd.system.dimension.spacing.twoExtraSmall",
    px: "sd.system.dimension.spacing.twoExtraSmall",
    color: "sd.system.color.component.onSurfaceVariant",
  },
});
