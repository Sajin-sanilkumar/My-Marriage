const Link_component=({ caption,link,children})=>{
    return(
        <a  href={link} className="mt-4 flex items-center gap-x-2 fade-text text-sm hover:underline">
                    {children}
                    {caption}
        </a>
    )
}

export default Link_component;