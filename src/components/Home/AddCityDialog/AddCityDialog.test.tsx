import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ICityItem } from "redux/cities/citiesTypes";
import { AddCityDialog } from "./AddCityDialog";

const cities: ICityItem[] = [
  {
    id: 710791,
    name: "Cherkasy",
    state: "",
    country: "UA",
    coord: {
      lon: 32.062069,
      lat: 49.428539,
    },
  },
];

const handleSubmit = jest.fn();
const handleClose = jest.fn();

describe("AddCityDialog component", () => {
  it("Dialog renders", () => {
    render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    expect(screen.getByText("Add new city")).toBeInTheDocument();
    expect(screen.getByText("Cherkasy")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("Dialog with no items renders", () => {
    render(
      <AddCityDialog
        cities={[]}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    expect(screen.getByText("Add new city")).toBeInTheDocument();
    expect(screen.getByText("No cities available")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("Dialog is not renders", () => {
    render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open={false}
        onClose={handleClose}
      />
    );

    expect(screen.queryByText("Add new city")).toBeNull();
  });

  it("Checked icon renders", () => {
    render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    userEvent.click(screen.getByText("Cherkasy"));
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
  });

  it("onSubmit called", () => {
    render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    userEvent.click(screen.getByText("Cherkasy"));
    userEvent.click(screen.getByText("Add"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("onClose called", () => {
    render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    userEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("Dialog snapshot", () => {
    const { container } = render(
      <AddCityDialog
        cities={cities}
        onSubmit={handleSubmit}
        open
        onClose={handleClose}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
