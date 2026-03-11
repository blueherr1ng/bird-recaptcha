
function RecaptchaHeader() {
    return (
        <div>
            <div>select all squares with</div>
            <div>birds</div>
            <div>if there are none, click skip</div>
        </div>
    );
}
  
function RecaptchaGrid() {
    return(<div>
        not implemented yet
    </div>)
}

function RecaptchaFooter(){
    return(<>
        <button> refresh </button>
        <button> audio </button>
        <button> information </button>
        <button> skip </button>
        <button> next </button>
    </>)
}

function Recaptcha() {

    return (
    <> 
        <RecaptchaHeader />
        <RecaptchaGrid />
        <RecaptchaFooter />
    </>
  );
}


export default function Container () {
    return (
        <div>
        <div>
            buttons
            <button>game</button>
            <button>gallery</button>
        </div>
        <div>
            gameContainer
            <Recaptcha />
        </div>
        </div>
    );
}