import { destructure } from "@solid-primitives/destructure";
import { Button } from "cui-solid";
import { pageChangeInf, pageOptionsProps } from "../Pdf";
import { createMemo } from "solid-js";

interface ToolsBarProps {
  onChange: (options: pageChangeInf) => void;
  page: pageOptionsProps;
}

export default function ToolsBar(props: ToolsBarProps) {
  const { page } = destructure(props);
  const { onChange: emit } = props;

  const pageDisabled = createMemo(() => (item: string) => {
    if (item === "pre") {
      if (!page().pageNum || page().pageNum === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (page().pageNum >= page().pageTotal) {
        return true;
      } else {
        return false;
      }
    }
  });

  function onChange(type: string, value: string | number) {
    emit({ type, value });
  }

  return (
    <>
      <Button onClick={onChange("scale", 1)} type="warning">
        放大
      </Button>
      <Button
        disabled={pageDisabled()("pre")}
        onClick={onChange("page", "pre")}
        type="primary"
      >
        上一页
      </Button>
      <span>{page().pageNum + "/" + page().pageTotal}</span>
      <Button
        disabled={pageDisabled()("next")}
        onClick={onChange("page", "next")}
        type="primary"
      >
        下一页
      </Button>
      <Button onClick={onChange("scale", -1)} type="warning">
        缩小
      </Button>
      <Button onClick={onChange("download", 0)} type="danger">
        下载
      </Button>
    </>
  );
}
