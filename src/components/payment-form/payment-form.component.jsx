import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default function PaymentForm({ onPaymentSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setIsProcessing(true); // Start processing

    // Simulate a processing delay of 2 seconds
    setTimeout(() => {
      setIsProcessing(false); // Stop processing
      // Simulate successful payment
    }, 2000);
    onPaymentSuccess();
  };

  // Watching fields to update the card preview dynamically
  const watchCardDetails = watch(["number", "name", "expiry", "cvc"]);

  return (
    <div className="p-4">
      <Cards
        number={watchCardDetails[0] || ""}
        name={watchCardDetails[1] || ""}
        expiry={watchCardDetails[2] || ""}
        cvc={watchCardDetails[3] || ""}
        focused={document.activeElement.name}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            {...register("number", { required: true })}
            type="text"
            placeholder="Card Number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.number && (
            <span className="text-red-500 text-xs">
              Card Number is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Name on Card
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name on Card"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && (
            <span className="text-red-500 text-xs">Name is required</span>
          )}
        </div>
        <div className="flex space-x-4">
          <div>
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              {...register("expiry", { required: true })}
              type="text"
              placeholder="MM/YY"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.expiry && (
              <span className="text-red-500 text-xs">
                Expiry Date is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              {...register("cvc", { required: true })}
              type="text"
              placeholder="CVC"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.cvc && (
              <span className="text-red-500 text-xs">CVC is required</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isProcessing}
          className={`mt-4 w-full ${
            isProcessing ? "bg-gray-500" : "bg-blue-500"
          } text-white p-2 rounded-md`}>
          {isProcessing ? "Processing..." : "Process Payment"}
        </button>
      </form>
    </div>
  );
}
