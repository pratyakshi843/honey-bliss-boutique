
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { 
  toggleCart, 
  closeCart, 
  removeFromCart, 
  removeItemCompletely,
  clearCart 
} from "../store/cartSlice";
import { Plus, Minus, X, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const cartRef = useRef<HTMLDivElement>(null);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      dispatch(closeCart());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        ref={cartRef}
        className="bg-white w-full max-w-md h-full flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any honey to your cart yet.
            </p>
            <Button 
              onClick={() => dispatch(toggleCart())}
              className="bg-honey-600 hover:bg-honey-700"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-4 border-b last:border-0"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                    <p className="text-honey-700 font-medium mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ml-2">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            { id: item.id, name: item.name, price: item.price, image: item.image, weight: item.weight }
                          )
                        }
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeItemCompletely(item.id))}
                      className="p-1 mt-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold mb-4">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-honey-600 hover:bg-honey-700"
                asChild
              >
                <Link to="/checkout" onClick={() => dispatch(closeCart())}>
                  Proceed to Checkout
                </Link>
              </Button>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
