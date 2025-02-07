interface btnProps{
    title?:string,
    onClick?:() => any
    variant:'primary'|'secondary',
    size:'sm'|'md'|'lg'
}

const VariantStyles = {
    'primary':'bg-slate-950 text-white font-semibold',
    'secondary':'bg-white border-slate-950 font-semibold'
}

const sizeStyles = {
    'sm':"w-38 h-10",
    'md':'',
    'lg':''
}

export default function Button(props:btnProps){
    return <button onClick={props.onClick} className={`${VariantStyles[props.variant]} ${sizeStyles[props.size]} rounded-3xl`}>{props.title}</button>
}