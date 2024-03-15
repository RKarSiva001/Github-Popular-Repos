// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    isLoading: false,
    activeOptionId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({
      isLoading: true,
    })

    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(repos => ({
        name: repos.name,
        id: repos.id,
        issuesCount: repos.issues_count,
        forksCount: repos.forks_count,
        starsCount: repos.stars_count,
        avatarUrl: repos.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        isLoading: false,
      })
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRepos)
  }

  renderReposList = () => {
    const {reposList, activeOptionId} = this.state

    return (
      <>
        <h1>Popular</h1>
        <LanguageFilterItem
          activeOptionId={activeOptionId}
          languageFiltersData={languageFiltersData}
          updateActiveOptionId={this.updateActiveOptionId}
        />
        <ul>
          {reposList.map(repo => (
            <RepositoryItem reposData={repo} key={repo.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderReposList()
  }
}

export default GithubPopularRepos
