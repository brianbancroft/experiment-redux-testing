import React from "react";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { renderWithProviders } from "../../test/renderWithProviders";

import { Counter } from "./Counter";

it("should render the counter", () => {
  renderWithProviders(<Counter />);

  const counter = screen.getByTestId("base-counter");

  expect(counter).toBeInTheDocument();
});

describe("Plus button", () => {
  it("should increment the counter", () => {
    renderWithProviders(<Counter />);

    const plusButton = screen.getByText("+");
    const counter = screen.getByTestId("base-counter");

    expect(counter).toHaveTextContent("0");

    act(() => {
      plusButton.click();
    });

    expect(counter).toHaveTextContent("1");
  });
});

describe("Minus button", () => {
  it("should decrement the counter", () => {
    renderWithProviders(<Counter />);

    const minusButton = screen.getByText("-");
    const counter = screen.getByTestId("base-counter");

    expect(counter).toHaveTextContent("0");

    act(() => {
      minusButton.click();
    });

    expect(counter).toHaveTextContent("-1");
  });
});

describe("Add amount functionality", () => {
  it("should add the amount to the counter", () => {
    renderWithProviders(<Counter />);

    const amountInput = screen.getByLabelText("Set increment amount");
    const addAmountButton = screen.getByText("Add Amount");
    const counter = screen.getByTestId("base-counter");

    expect(counter).toHaveTextContent("0");

    const amount = faker.datatype.number({
      min: 10,
      max: 50,
    });

    // find the Set increment amount input
    const input = screen.getByLabelText("Set increment amount");
    fireEvent.change(input, { target: { value: amount } });

    act(() => {
      amountInput.dispatchEvent(new Event("input"));
      addAmountButton.click();
    });

    expect(counter).toHaveTextContent(amount);
  });
});

describe("Add async functionality", () => {
  test("should add the amount to the counter", async () => {
    renderWithProviders(<Counter />);

    const amountInput = screen.getByLabelText("Set increment amount");
    const addAsyncButton = screen.getByText("Add Async");
    const counter = screen.getByTestId("base-counter");

    expect(counter).toHaveTextContent("0");

    const amount = faker.datatype.number({
      min: 10,
      max: 50,
    });

    // find the Set increment amount input
    const input = screen.getByLabelText("Set increment amount");
    fireEvent.change(input, { target: { value: amount } });

    act(() => {
      amountInput.dispatchEvent(new Event("input"));
      addAsyncButton.click();
    });

    // wait for the async action to complete
    await waitFor(() => {
      expect(counter).toHaveTextContent(amount);
    });
  });
});

describe("Add if odd functionality", () => {
  describe("when the counter is odd", () => {
    test("should add the amount to the counter", () => {
      renderWithProviders(<Counter />);

      const amountInput = screen.getByLabelText("Set increment amount");
      const addIfOddButton = screen.getByText("Add If Odd");
      const counter = screen.getByTestId("base-counter");

      expect(counter).toHaveTextContent("0");

      const amount =
        2 *
          faker.datatype.number({
            min: 10,
            max: 50,
          }) +
        1;

      // find the Set increment amount input
      const input = screen.getByLabelText("Set increment amount");
      fireEvent.change(input, { target: { value: amount } });

      const plusButton = screen.getByText("+");

      expect(counter).toHaveTextContent("0");

      act(() => {
        plusButton.click();
      });

      act(() => {
        amountInput.dispatchEvent(new Event("input"));
        addIfOddButton.click();
      });

      expect(counter).toHaveTextContent(amount + 1);
    });
  });
  describe("when the counter is even", () => {
    test("should not add the amount to the counter", () => {
      renderWithProviders(<Counter />);

      const amountInput = screen.getByLabelText("Set increment amount");
      const addIfOddButton = screen.getByText("Add If Odd");
      const counter = screen.getByTestId("base-counter");

      expect(counter).toHaveTextContent("0");

      const amount =
        2 *
        faker.datatype.number({
          min: 10,
          max: 50,
        });

      // find the Set increment amount input
      const input = screen.getByLabelText("Set increment amount");
      fireEvent.change(input, { target: { value: amount } });

      act(() => {
        amountInput.dispatchEvent(new Event("input"));
        addIfOddButton.click();
      });

      expect(counter).toHaveTextContent("0");
    });
  });
});
