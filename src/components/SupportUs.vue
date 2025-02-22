<script setup>
import Paystack from '@paystack/inline-js'
import axios from 'axios'
import { keys } from '@/utils/env'
async function paymentGateway() {
  // try {
  //   const popup = new Paystack();
  //   popup.newTransaction({
  //     key: keys.paystack.publicKey,
  //     email: this.userInfo.email,
  //     amount: this.total * 100 * 1700,
  //     currency: "NGN",
  //     firstName: this.userInfo.name.firstname,
  //     lastName: this.userInfo.name.lastname,
  //     phone: this.phone,
  //     channels: [
  //       "card",
  //       "bank",
  //       "ussd",
  //       "qr",
  //       "eft",
  //       "mobile_money",
  //       "bank_transfer",
  //       "apple_pay",
  //     ],
  //     onSuccess: (transaction) => {
  //       console.log(transaction);
  //       axios
  //         .get(
  //           `https://api.paystack.co/transaction/verify/${transaction.reference}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${keys.paystack.secretKey}`,
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           const res = response.data;
  //           //console.log(res);
  //           if (
  //             res.status &&
  //             res.data.status == "success" &&
  //             res.data.amount >= (this.total * 1700) / 100
  //           ) {
  //             this.createOrder();
  //           }
  //         });
  //     },
  //     onLoad: (response) => {
  //       //console.log("onLoad: ", response);
  //     },
  //     onCancel: () => {
  //       //console.log("onCancel");
  //     },
  //     onError: (error) => {
  //       //console.log("Error: ", error.message);
  //       this.flutterwave();
  //     },
  //   });
  // } catch (error) {
  //   //console.error(error);
  // }
}
</script>

<template>
  <div class="bg-Tiber p-10 lg:p-14">
    <div class="relative flex items-center justify-center">
      <!-- Left Content -->
      <div class="md:container mx-auto px-4 flex flex-wrap lg:flex-nowrap items-center">
        <div class="w-full lg:w-1/2 text-white">
          <button
            class="bg-Sushi text-white font-semibold text-sm px-4 py-2 rounded-full mb-4 cursor-text"
          >
            Support Us
          </button>
          <h1 class="text-4xl font-bold mb-5 leading-tight font-Poppins text-Bay_Leaf">
            Help Us Provide Better <br />
            Mental Health Support
          </h1>
          <p class="text-[#c8d3c2] text-lg font-Montserrat font-medium">
            Your support allows us to connect individuals with licensed therapists and provide
            access to a thriving community of peers. Together, we can make mental health resources
            accessible to everyone, when and where they need them most.
          </p>
        </div>

        <!-- Donation Form -->
        <div class="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <form>
              <div class="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  class="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-Sushi"
                />
              </div>
              <div class="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  class="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-Sushi"
                />
              </div>
              <div class="flex w-full justify-between mb-6">
                <div
                  class="w-1/3 font-medium px-6 py-2 border border-Sushi text-Sushi text-sm hover:bg-orange-100"
                >
                  &#8358;2000
                </div>
                <div
                  class="w-1/3 font-medium px-6 py-2 border border-gray-300 text-gray-500 text-sm hover:bg-gray-100"
                >
                  &#8358;5000
                </div>
                <div
                  class="w-1/3 font-medium px-6 py-2 border border-gray-300 text-gray-500 text-sm hover:bg-gray-100"
                >
                  &#8358;10000
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white py-3 rounded-lg font-medium text-sm bg-Sushi hover:bg-Bay_Leaf focus:ring-4 focus:ring-Sushi flex justify-center items-center"
              >
                Donate Now
                <span class="ml-2">
                  <i class="fa fa-arrow-right"></i>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
