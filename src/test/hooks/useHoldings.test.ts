import { renderHook, act, waitFor } from "@testing-library/react";
import { useHoldings } from "../../hooks/useHoldings";
import { holdingsFixture } from "../__utils__/fixtures";

import { getHoldings } from "../../api";
import { notify } from "../../services/notification";
import type { Holding } from "../../types/HoldingCompany";

vi.mock("../../api");
vi.mock("../../services/notification");

const mockedGetHoldings = vi.mocked(getHoldings);
const mockedNotify = vi.mocked(notify.error);

describe("useHoldings", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedGetHoldings.mockReset();
    mockedNotify.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return data on success", async () => {
    mockedGetHoldings.mockImplementation(() =>
      Promise.resolve(holdingsFixture)
    );

    const { result } = renderHook(() => useHoldings());

    await waitFor(() => {
      return expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.holdings).toEqual(holdingsFixture);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("should show error and notify user", async () => {
    const testError = new Error("500");
    mockedGetHoldings.mockRejectedValue(testError);

    const { result } = renderHook(() => useHoldings());

    await waitFor(() => {
      return expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.message).toBe("500");
    expect(result.current.holdings).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(mockedNotify).toHaveBeenCalledWith("Failed to load holdings: 500");
  });

  it("should clear error and refetch successfully", async () => {
    const testError = new Error("503");
    mockedGetHoldings
      .mockRejectedValueOnce(testError)
      .mockResolvedValueOnce(holdingsFixture);

    const { result } = renderHook(() => useHoldings());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).not.toBeNull();
      return true;
    });

    expect(result.current.error).not.toBeNull();

    mockedNotify.mockClear();

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      return true;
    });

    expect(result.current.error).toBeNull();
    expect(result.current.holdings).toEqual(holdingsFixture);
    expect(result.current.isLoading).toBe(false);
  });

  it("should stay loading until promise settles", async () => {
    let resolvePromise: (value: Holding[]) => void;
    mockedGetHoldings.mockImplementation(
      () =>
        new Promise<Holding[]>((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { result } = renderHook(() => useHoldings());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.holdings).toEqual([]);
    expect(result.current.error).toBeNull();

    await act(async () => {
      resolvePromise!(holdingsFixture);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.holdings).toEqual(holdingsFixture);
  });
});
