'use client'

export default function Error({error, reset} : {error: any, reset :any}) {

    return (
        <div>
            <h4>Error</h4>
            <button onClick={() => { reset() }}>Reset</button>
        </div>
        
    )
}