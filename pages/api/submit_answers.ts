// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

const isNil = (val: any) => (
  val === undefined || val === null
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const { answers, quiz_id, uid } = req.body
    const endpoint = "https://quizitiv-controller.herokuapp.com/submit_answers"
    const response = await axios.post(endpoint, {
      "uid": uid,
      "answers": answers,
      'quiz_id': quiz_id,
    }, { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':  req.headers.authorization
      } 
    })

    // no data returned
    if (response.data === undefined || response.data === null) {
      res.status(500).json({ message: 'Our servers did not respond with useful data.' })
    }

    // data returned is not what is expected
    else if (isNil(response.data.message) || isNil(response.data.score)) {
      res.status(500).json({ message: 'Our servers did not respond with useful data.' })
    }

    else {
      const { data, status } = response
      // pass status and data from external server
      res.status(status).json(data) 
    }
  }

  catch (error) {
    console.log("Error: ", error)
    res.status(500).json({ message: 'Failed to communicate with external middleware.' })
  }

}
