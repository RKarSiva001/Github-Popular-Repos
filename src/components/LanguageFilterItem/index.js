// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, updateActiveOptionId} = props

  //   const onChangeSortby = event => {
  //     updateActiveOptionId(event.target.value)
  //   }

  const onClickSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div>
      {/* <select value={activeOptionId} onChange={onChangeSortby}>
        {languageFiltersData.map(eachOption => (
          <option key={eachOption.optionId} value={eachOption.optionId}>
            {eachOption.language}
          </option>
        ))}
      </select> */}

      {languageFiltersData.map(eachOption => (
        <button
          type="button"
          key={eachOption.id}
          value={eachOption.id}
          onClick={onClickSortby}
        >
          {eachOption.language}
        </button>
      ))}
    </div>
  )
}

export default LanguageFilterItem
