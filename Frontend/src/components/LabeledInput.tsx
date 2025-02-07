interface InputProps{
    title:string,
    type:string,
    placeholder?:string,
    size:'sm'|'md'|'lg',
    onChange?:(e:any) => void | Promise<void>
}

const sizeVariants = {
    'sm' : "h-8 w-66",
    'md' : "h-14 w-64",
    'lg' : "h-16 w-66"
}

export default function LabeledInput(props:InputProps){
    return <div>
        <div className="font-semibold">{props.title}</div>
        <input type={props.type} placeholder={props.placeholder} className={`${sizeVariants[props.size]} border-2 rounded-md text-center`} onChange={props.onChange}></input>
    </div>
}