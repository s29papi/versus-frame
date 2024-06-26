import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

// should handle the claim tx
/**
 * About stake frame
 * A user stakes to confirm match creation 
 * redirect to the first frame which checks if the match is started if it is started frame should be view match
*/
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const gameId:any = searchParams.get("gameId");
  const gameName:any = searchParams.get("gameName");
  const gameSetup:any = searchParams.get("gameSetup");
  const stakeAmount:any = searchParams.get("stakeAmount");
  const creatorFid:any = searchParams.get("creatorFid");
//   const buttonId = body.untrustedData.buttonIndex;
  
  let queryParams = `gameId=${gameId}&&gameName=${gameName}&&gameSetup=${gameSetup}&&stakeAmount=${stakeAmount}&&creatorFid=${creatorFid}`
  const framesUrl = "https://versus-frame.vercel.app"; 
  let imageUrl = new URL("/og/landing", framesUrl).href

  let postUrl = new URL(`/api/stake/frame_3?${queryParams}`, framesUrl).href


    return new NextResponse(`<!DOCTYPE html><html><head>
          <title>Start My Match</title>
          <meta property="fc:frame" content="vNext" />        
          <meta property="fc:frame:image" content="${imageUrl}"/>
          <meta property="fc:frame:button:1" content="View Tx" />
          <meta property="fc:frame:button:1:action" content="post"/>
          <meta property="fc:frame:button:2" content="Continue" />
          <meta property="fc:frame:button:2:action" content="post"/>
          <meta property="fc:frame:post_url" content="${postUrl}"/>
      </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';