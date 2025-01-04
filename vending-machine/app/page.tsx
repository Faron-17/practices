"use client"
import { Dispatch, SetStateAction, useState } from "react";

interface ProductsProps {
  price: number;
  name: string;
}

type SetInsertedAmtProps = Dispatch<SetStateAction<number>>;
type SetPurchasedItemNameProps = Dispatch<SetStateAction<string>>;

const PRODUCTS: ProductsProps[] = [
  {price: 150, name: "緑茶"},
  {price: 100, name: "水"},
  {price: 130, name: "コーラ"},
  {price: 120, name: "ほうじ茶"},
  {price: 140, name: "ココア"},
  {price: 50, name: "ぶどうジュース"},
  {price: 200, name: "レモンティー"},
  {price: 120, name: "アイスコーヒー"},
  {price: 100, name: "午前の紅茶"},
  {price: 110, name: "カルピス"},
  {price: 120, name: "甘酒"},
  {price: 150, name: "麦茶"},
];

export default function Home() {
  return (
    <VendingMachine products={PRODUCTS} />
  )
}

function VendingMachine({products}: {products: ProductsProps[]}) {
  const [insertedAmt, setInsertedAmt] = useState<number>(0);
  const [purchasedItemName, setPurchasedItemName] = useState<string>("");

  return (
    <div className="w-[420px] h-[770px] bg-slate-50 mx-56 my-10 p-10">
      <Showcase products={products} value={insertedAmt} onInsertedAmt={setInsertedAmt} onPurchasedItemName={setPurchasedItemName} />
      <Payments value={insertedAmt} onInsertedAmtChange={setInsertedAmt} onPurchasedItemNameChange={setPurchasedItemName} />
      <Output name={purchasedItemName} />
    </div>
  )
}

function Showcase(
  {products, value, onInsertedAmt, onPurchasedItemName} :
  {products: ProductsProps[], value: number, onInsertedAmt: SetInsertedAmtProps, onPurchasedItemName: SetPurchasedItemNameProps}
) {
  return (
    <>
      <Products products={products} value={value} onInsertedAmt={onInsertedAmt} onPurchasedItemName={onPurchasedItemName} />
    </>
  )
}

function Products(
  {products, value, onInsertedAmt, onPurchasedItemName}:
  {products: ProductsProps[], value: number, onInsertedAmt: SetInsertedAmtProps, onPurchasedItemName: SetPurchasedItemNameProps}) {
  const productArray = products.map((item: ProductsProps) => {
      const isDisabled = item.price > value
      return (<div key={item.name}>
        <Item name={item.name} />
        <Button item={item} isDisabled={isDisabled} value={value} onInsertedAmt={onInsertedAmt} onPurchasedItemName={onPurchasedItemName} />
      </div>)
    }
  )
  return (
    <div className="grid grid-cols-6 gap-5 w-full grid-flow-row">
      {productArray}
    </div>
  )
}

function Item({name}: {name: string}) {
  return (
    <div className="bg-slate-200 w-full h-36 p-2 [writing-mode:vertical-lr]">
      {name}
    </div>
  )
}

function Button(
  {item, onInsertedAmt, value, isDisabled, onPurchasedItemName}:
  {item: ProductsProps, onInsertedAmt: SetInsertedAmtProps, value: number, isDisabled: boolean, onPurchasedItemName: SetPurchasedItemNameProps}
) {
  return (
    <button className={`w-full bg-slate-300 ${isDisabled ? "bg-slate-400" : ""}`}
            onClick={(e) => {
              onInsertedAmt(value - item.price);
              onPurchasedItemName(item.name)
            }}
            disabled={isDisabled}>
      <span>{item.price}</span>
    </button>
  )
}

function Payments(
  {value, onInsertedAmtChange, onPurchasedItemNameChange}:
  {value: number, onInsertedAmtChange: SetInsertedAmtProps, onPurchasedItemNameChange: SetPurchasedItemNameProps}
) {
  return (
    <div className="flex items-end flex-col mt-10">
      <MoneySlot value={value} onInsertedAmtChange={onInsertedAmtChange} />
      <Deposit value={value} />
      <Change onInsertedAmtChange={onInsertedAmtChange} onPurchasedItemNameChange={onPurchasedItemNameChange} />
    </div>
  )
}

function MoneySlot(
  {value, onInsertedAmtChange}:
  {value: number, onInsertedAmtChange: SetInsertedAmtProps}
) {
  return (
    <input type="number" min="0" value={value} onChange={(e) => onInsertedAmtChange(Number(e.target.value))} />
  )
}

function Deposit({value}: {value: number}) {
  return (
    <p className="mt-5">お釣り： {value}円</p>
  )
}

function Change(
  {onInsertedAmtChange, onPurchasedItemNameChange}:
  {onInsertedAmtChange: SetInsertedAmtProps, onPurchasedItemNameChange: SetPurchasedItemNameProps}
) {
  return (
    <button
      onClick={()=>{onInsertedAmtChange(0); onPurchasedItemNameChange("")}}
      className="bg-sky-100 rounded p-1 mt-2"
    >お釣りをもらう</button>
  )
}

function Output({name}: {name: string}) {
  return (
    <div className="mt-20">
      <OutputTray name={name} />
    </div>
  )
}

function OutputTray({name}: {name: string}) {
  return (
    <p>購入品：{name}</p>
  )
}