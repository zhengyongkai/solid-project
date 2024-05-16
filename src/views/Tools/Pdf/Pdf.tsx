import { create, PDFSlick } from "@pdfslick/solid";
import "@pdfslick/solid/dist/pdf_viewer.css";
import { onMount, onCleanup, createSignal } from "solid-js";
import ToolsBar from "./components/ToolsBar";
import { Card } from "cui-solid";

export interface pageOptionsProps {
  pageNum: number;
  pageTotal: number;
  scale: number;
}

export type pageChangeInf = { type: string; value: string | number };

export default function PdfView() {
  const store = create();

  let container: HTMLDivElement | undefined;
  const pdfPath =
    "http://idl.hbdlib.cn/book/00000000000000/pdfbook/018/017/163889.pdf";

  let pdfSlick: PDFSlick;
  let unsubscribe: () => void;

  const [pageOptions, setPageOptions] = createSignal<pageOptionsProps>({
    pageNum: 1,
    pageTotal: 0,
    scale: 0,
  });

  onMount(() => {
    pdfSlick = new PDFSlick({
      container,
      store,
      viewer: container,
      options: {
        scaleValue: "auto",
        singlePageViewer: true,
      },
    } as {
      container: HTMLDivElement;
    });
    pdfSlick.loadDocument(pdfPath);
    store.setState({ pdfSlick });
    // pdfSlick.save();

    unsubscribe = store.subscribe((s) => {
      setPageOptions({
        pageNum: s.pageNumber,
        pageTotal: s.numPages,
        scale: s.scale,
      });
    });
  });

  onCleanup(() => {
    unsubscribe();
  });

  function onChange(options: pageChangeInf) {
    // store.
    if (options.type === "page") {
      switch (options.value) {
        case "pre":
          pdfSlick.gotoPage(pageOptions().pageNum - 1);
          break;
        case "next":
          pdfSlick.gotoPage(pageOptions().pageNum + 1);
          break;
      }
    } else if (options.type === "scale") {
      switch (options.value) {
        case -1:
          pdfSlick.decreaseScale();
          break;
        case 1:
          pdfSlick.increaseScale();
          break;
      }
    } else if (options.type === "download") {
      pdfSlick.download();
    }
  }

  return (
    <div style={{ position: "relative", width: "800px" }}>
      <div
        class="card-wrapper"
        style={{
          position: "absolute",
          "z-index": 50,
          top: "10px",
          left: "10px",
          width: "700px",
          "text-align": "center",
        }}
      >
        <ToolsBar onChange={onChange} page={pageOptions()}></ToolsBar>
      </div>
      <div
        ref={container}
        style={{
          position: "absolute",
          height: "600px",
          overflow: "auto",
          width: "700px",
        }}
      ></div>
    </div>
  );
}
