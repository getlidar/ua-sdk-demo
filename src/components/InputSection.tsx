import { ImInfo } from "react-icons/im";
import { RiErrorWarningFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";

export function InputSection({
  title,
  passwordField,//whether or not it is a password field
  value,//the serch term to be used to filter assets,etc
  setValue,//function to change the search term
  hint,//hint text,
  showHint=false,
  isTextField=false,//whether or not it's a textfield
  placeHolder='',
  disabled=false,
  pre,
  rows=3,
  extraInputClasses,
  isEntryValid=true,
  setIsEntryValid,
  withButton=false,
  buttonName="",
  buttonOnClick,
  inModal,
  warning
}:{
  title: string,
  passwordField: boolean,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  hint?: string,
  showHint?: boolean,
  isTextField?: boolean,
  placeHolder?: string,
  disabled?: boolean,
  pre?: string,
  extraInputClasses?: string,
  rows?: number
  isEntryValid?: boolean,
  setIsEntryValid?: React.Dispatch<React.SetStateAction<boolean>>,
  withButton?: boolean,
  buttonName?: string,
  buttonOnClick?: React.Dispatch<React.SetStateAction<void>>
  inModal?: boolean,
  warning?: string
}) {

  var buttonDiv = null;
  if (buttonOnClick) {
    buttonDiv = 
      <div className='min-w-fit'>
        <button 
          className='px-3 min-w-fit bg-referralMintColor8 hover:bg-referralMintColor5 border border-black bg-lightBg6 dark:text-black rounded-lg dark:bg-referralMintColor5 hover:bg-referralMintColor5a'
          onClick={() => {
            if (buttonOnClick) buttonOnClick()
          }}
        >
          {buttonName}
        </button>
      </div>
  }

  var warningDiv = undefined;
  if (warning) warningDiv = (
    <RiErrorWarningFill
      data-tip={warning}
      size={'1.15em'}
      className="text-black dark:text-referralMintYellowAlt my-auto"
    />
  );

  return (
    <div className="dark w-full flex flex-row justify-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between">
          <ReactTooltip />
          <div
            className={ (isEntryValid ? (inModal ? 'dark:text-gray-400' : (disabled ? "dark:text-gray-400 text-lg" : "dark:text-referralMintColor text-lg")) : "text-semanticRed text-lg") + " w-full flex flex-row space-x-2"}
          >
            <div>{title}</div>
            { hint && <ImInfo data-tip={hint} className={(inModal ? 'dark:text-gray-400' : (disabled ? "dark:text-gray-400 text-lg" : "dark:text-referralMintColor text-lg")) + " my-auto"}/> }
            { warningDiv }
          </div>
          { buttonDiv }
        </div> 
        <div className="flex flex-row">
          {
            pre && 
            <div className="flex flex-row my-auto pt-2 pr-2 dark:text-gray-400">
              {pre ? pre : ''}
            </div>
          }

          {
            isTextField
              ?
                <textarea 
                  className={extraInputClasses + ' border border-black w-full max-h-[33vh] min-h-[120px] rounded-lg p-3 mt-2 bg-white/0 dark:bg-darkBg4 dark:focus:text-referralMintColor8' + ((value && value.trim() !== '') ? ' dark:text-referralMintColor8' : ' dark:text-gray-500') + (disabled ? ' bg-white/50 dark:bg-darkBg2 cursor-not-allowed' : '')}
                  rows={rows}
                  value={value}
                  onChange={(e) => {
                    if (setIsEntryValid) setIsEntryValid(true);
                    setValue(e.target.value);
                  }}
                  disabled={disabled}
                  placeholder={placeHolder}
                />
              :
                <input
                  className={extraInputClasses + ' border border-black w-full text-ellipsis rounded-lg p-1 px-3 mt-2 bg-white dark:bg-darkBg4 dark:focus:text-referralMintColor8' + ((value && value.trim() !== '') ? ' dark:text-referralMintColor8' : ' dark:text-gray-500')  + (disabled ? ' cursor-not-allowed bg-white/0 dark:bg-darkBg2' : '')}
                  value={value}
                  onChange={(e) => {
                    if (setIsEntryValid) setIsEntryValid(true);
                    setValue(e.target.value);
                  }}
                  type={
                    passwordField ? 'password' : 'text'
                  }
                  disabled={disabled}
                  placeholder={placeHolder}
                />
          }
        </div>
      </div>
    </div>
  );
}