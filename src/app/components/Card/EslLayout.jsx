export default function EslLayout({ productName = "제품명", productPrice = 0 }) {
    return (
      <div className="font-galmuri relative border-8 border-l-15 border-white rounded-xl bg-gray-400 text-black w-80 h-32 shadow-lg">
        <div className="border-b border-black px-1 py-1">{productName}</div>
        <div className="grid grid-cols-3 grid-rows-2">
          <div className="tracking-tighter justify-center">
            <div className="col-span-1 inline-flex">
              <p className="font-light">|||</p>
              <p className="font-semibold">|||</p>
              <p className="font-light">|||</p>
              <p className="font-extrabold">|</p>
              <p className="font-extrabold">|</p>
              <p>|||</p>
            </div>
            <div className="text-xs font-light">
              <p>012345678</p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="absolute flex-col text-end bottom-1 right-1 ">
              <div className="text-4xl">{productPrice}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  