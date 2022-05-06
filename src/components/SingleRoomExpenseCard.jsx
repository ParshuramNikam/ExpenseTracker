import React from "react";

function SingleRoomExpenseCard() {
  return (
    <div>
      <div className="mx-3">
        <label className="mx-2" for="month">
          Choose Month:
        </label>
        <select name="month" id="month">
          <option value="jan">Jan</option>
          <option value="feb">Feb</option>
          <option value="mar">Mar</option>
          <option value="apr">Apr</option>
          <option value="may">May</option>
          <option value="jun">Jun</option>
          <option value="jul">Jul</option>
          <option value="aug">Aug</option>
          <option value="sep">Sep</option>
          <option value="oct">Oct</option>
          <option value="nov">Nov</option>
          <option value="dec">Dec</option>
        </select>
        <label className="mx-2 ml-3" for="year">
          Choose Year:
        </label>
        <input type="number" placeholder="Enter Year"></input>
        <div class="p-10">
          <p class="mb-4 text-gray-600 text-center">
            Simple search for capturing user input.
          </p>
          <div class="md:w-1/2 lg:w-1/3 m-auto border shadow">
            <div id="app" class="bg-gray-200 p-10"></div>
          </div>
        </div>
      </div>
      <div className="flex border-t-4 border-red-500 md:flex justify-between gap-3 m-2 rounded-md shadow-md bg-white text-gray-700 px-4 py-3">
        <div>
          <div className="flex justify-between">
            <h1 className="w-min p-2 text-red-500  bg-red-100 rounded-lg text-base font-semibold">
              Room 1
            </h1>
            <div className=" mt-2 mr-2 text-gray-800 font-medium md:mt-0 text-3xl whitespace-nowrap text-right my-auto">
              &#8377; 5000
            </div>
          </div>
          <div className="font-semibold text-black">
            Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet consectetur
            adipi elit. Earum voluptatem porro perferendis.
          </div>
          <div className="mt-4 text-sm font-normal text-gray-700">
            {" "}
            <span className="whitespace-nowrap">02 May 2022</span> |{" "}
            <span className="whitespace-nowrap">04:40 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleRoomExpenseCard;
