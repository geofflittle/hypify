import { Construct, Duration, Stack } from "@aws-cdk/core"

import { Schedule } from "@aws-cdk/aws-events"
import { ScheduledFunction } from "cdk-constructs"
import { Secret } from "@aws-cdk/aws-secretsmanager"
import { Topic } from "@aws-cdk/aws-sns"

export class HypifyStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id)
        const notifyMeTopic = Topic.fromTopicArn(this, "NotifyMeTopic", "arn:aws:sns:us-east-1:778760699735:NotifyMe")
        const hypifyClientIdSecret = Secret.fromSecretAttributes(this, "HypifyClientId", {
            secretArn: "arn:aws:secretsmanager:us-east-1:778760699735:secret:HypifyClientId-nzcE8M"
        })
        const hypifyClientSecretSecret = Secret.fromSecretAttributes(this, "HypifyClientSecret", {
            secretArn: "arn:aws:secretsmanager:us-east-1:778760699735:secret:HypifyClientSecret-szN1SU"
        })
        const spotifyRefreshTokenSecret = Secret.fromSecretAttributes(this, "SpotifyRefreshTokenSecret", {
            secretArn: "arn:aws:secretsmanager:us-east-1:778760699735:secret:SpotifyRefreshToken-DQFFPG"
        })
        const scdFnc = new ScheduledFunction(this, {
            name: "CurrentPlaylistUpdater",
            schedule: Schedule.cron({
                weekDay: "MON",
                hour: "10",
                minute: "0"
            }),
            alarmTopic: notifyMeTopic,
            environment: {
                USER_ID: "geoffslittle",
                HYPIFY_CLIENT_ID_SECRET_ARN: hypifyClientIdSecret.secretArn,
                HYPIFY_CLIENT_SECRET_SECRET_ARN: hypifyClientSecretSecret.secretArn,
                SPOTIFY_REFRESH_TOKEN_SECRET_ARN: spotifyRefreshTokenSecret.secretArn
            }
        })
        hypifyClientIdSecret.grantRead(scdFnc.fnc)
        hypifyClientSecretSecret.grantRead(scdFnc.fnc)
        spotifyRefreshTokenSecret.grantRead(scdFnc.fnc)
    }
}
