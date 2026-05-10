import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/products/store/cartStore";

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.setState({ count: 0 });
  });

  it("should initialize with 0 items", () => {
    const state = useCartStore.getState();
    expect(state.count).toBe(0);
  });

  it("should increment the cart count", () => {
    const { increment } = useCartStore.getState();
    increment(1);
    expect(useCartStore.getState().count).toBe(1);

    increment(2);
    expect(useCartStore.getState().count).toBe(3);
  });

  it("should set the absolute cart count", () => {
    const { setCount } = useCartStore.getState();
    setCount(5);
    expect(useCartStore.getState().count).toBe(5);
  });
});
