const { useState, useEffect} = React


const File = ({title}) => {
    return (
        <div className={'file'}>
             <img src={'/images/file.svg'} className={'folder__icon'}/>
            <p className={'file__text'}>{title}</p>
        </div>
    )
}

const Folder = ({title , id }) => {
    const [send, setSend] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (!send) return
        fetch(`http://164.90.161.80:3000/api/content?dirId=${id}`)
            .then(res => res.json())
            .then(res=> {
                setData(res?.children)
            })
    }, [send])

    const handleClick = () => {
        if(!data.length){
            setSend(true)
        }
        setShow(prev => !prev)
    }

    return (
        <div className={'folder'} >
            <div className={'folder__item'} onClick={handleClick}>
                <img src={show ? '/images/folderOpen.svg' : '/images/folder.svg'} className={'folder__icon'}/>
                <h4>{title}</h4>
            </div>
            {show && (
                <div className={'subfolder'}>
                    {!!data.length && data.map((item, index) => {    
                        if(item.hasOwnProperty('children')){
                            return (
                                <Folder 
                                    key={`file-${item?.id} - ${index}`} 
                                    title={item?.title} 
                                    id={item?.id}
                                />
                            )
                        }
                        return (    
                            <File 
                                key={`file-${item?.id} - ${index}`} 
                                title={item?.title}
                            /> 
                        ) 
                    })}
                </div>
            )}
        </div>
    )
}



const App = () => {
    const [folders, setFolders] = useState([])

    useEffect(() => {
        fetch('http://164.90.161.80:3000/api/content')
            .then(res => res.json())
            .then(res=> {
                setFolders(res?.children)
            })
            
    }, [])

    return (
        <div className='app'>
            <header className='header'>
                <h1 className='header__text'>Test for D-Habits</h1>
            </header>
            <main className='main'>
                {!!folders.length && folders.map((item, index) => (
                    <Folder 
                        key={`Folders-${index}-${item?.id}`} 
                        title={item?.title} 
                        id={item?.id}
                    />
                ))}
            </main>
        </div>
    )
}

ReactDOM.render(<App />,document.getElementById('root'));