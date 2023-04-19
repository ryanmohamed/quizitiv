import axios from 'axios';

export function submittAnswers(answers: any) {
  return axios.post('/api/submit_answers', { answers })
}
