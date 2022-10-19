import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class RegionsService {
  async getRegions() {
    const res = await api.get('/api/regions')
    AppState.regions = res.data
  }

  async getRegion(id) {
    const res = await api.get('/api/regions/' + id)
    AppState.activeRegion = res.data
  }

  async joinRegion(id) {
    const res = await api.post('/api/regions/' + id + '/join')
    AppState.members.push(res.data)
  }

  async getRegionMembers(id) {
    const res = await api.get('/api/regions/' + id + '/members')
    AppState.members = res.data
  }

  async getRegionMessages(id) {
    const res = await api.get('/api/regions/' + id + '/messages')
    AppState.messages = res.data
  }

  async createMessage(id, message) {
    await api.post('/api/regions/' + id + '/messages', message)
    // AppState.messages.push(res.data)
  }


}

export const regionsService = new RegionsService()
