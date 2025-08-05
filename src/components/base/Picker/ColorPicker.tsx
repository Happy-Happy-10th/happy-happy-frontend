import clsx from "clsx"

const ColorPickerFrame =clsx(
  "w-full pt-5 pb-5 pl-4 pr-4",
  "yoteyo-m-title-main-sm"
)

const colorPrickerStyle = clsx(
  "w-full",
  "flex flex-row flex-wrap gap-4 pt-5"
)
type PropsType={}
export default function ColorPicker({}:PropsType){
  const colors = [
    "yoteyo-red","yoteyo-orange","yoteyo-yellow","yoteyo-green","yoteyo-emerald",
    "yoteyo-sky","yoteyo-blue","yoteyo-purple","yoteyo-pink","yoteyo-black"
  ]
  return(
    <div className={ColorPickerFrame}>
      <span>이벤트 색상</span>
      <div className={colorPrickerStyle}>
        {colors.map((color)=>(
          <div
            key={`colorItem_${color}`}
            className={`bg-${color} w-8 h-8 rounded-full hover:cursor-pointer`}></div>
        ))}
      </div>
    </div>
  )
}