import useUserStore from "@/stores/user";
import { Card, Col, Progress, Row } from "cui-solid";

export default function Tailwindcss() {
  const {
    userInfo: [userInfo],
  } = useUserStore().data;

  const tData = Array(10)
    .fill(10)
    .map((_item, index) => {
      return (
        <tr>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              {index}
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              John Michael
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              Manager
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              23/04/18
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <a
              href="#"
              class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
            >
              Edit
            </a>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div>
        <Card class="card-wrapper">
          <h1 class="text-base">用TailWindCss + Cui-Solid写的页面</h1>
        </Card>
        <div>
          <Row gutter={20}>
            <Col xs={{ grid: 1 }} xl={{ grid: 1 / 2 }} md={{ grid: 1 / 2 }}>
              <Card>
                <img
                  class="w-full"
                  src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
                ></img>
                <div>
                  <div>
                    <img
                      src={userInfo().avatar}
                      class="w-16  rounded-full absolute  top-80 left-8"
                    />
                    <div class="w-full mt-12">
                      <Row class="mb-4">
                        <Col grid={1}>
                          <h2 class="text-base">Vue</h2>
                          <Progress
                            value={50}
                            strokeColor={["#108ee9", "#87d068", "#d9363e"]}
                          ></Progress>
                        </Col>
                      </Row>
                      <Row class="mb-4">
                        <Col grid={1}>
                          <h2 class="text-base">React</h2>
                          <Progress value={70} status="active"></Progress>
                        </Col>
                      </Row>
                      <Row class="mb-4">
                        <Col grid={1}>
                          <h2 class="text-base">SolidJS</h2>
                          <Progress value={70} status="error"></Progress>
                        </Col>
                      </Row>
                      <Row>
                        <Col grid={1}>
                          <h2 class="text-base">Sevlet</h2>
                          <Progress value={100}></Progress>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={{ grid: 1 }} xl={{ grid: 1 / 2 }} md={{ grid: 1 / 2 }}>
              <Card>
                <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                  <table class="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            No
                          </p>
                        </th>

                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Name
                          </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Job
                          </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Employed
                          </p>
                        </th>
                        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{tData}</tbody>
                  </table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div></div>
      </div>
    </>
  );
}
