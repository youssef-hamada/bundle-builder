import { render } from "@testing-library/react";
import Steps from "./components/steps/Steps";

jest.mock("./categories", () => ({
  __esModule: true,
  default: undefined,
}));

test("renders steps container even when category data is unavailable", () => {
  const { container } = render(<Steps />);

  expect(container.querySelector(".steps-container")).toBeInTheDocument();
});
