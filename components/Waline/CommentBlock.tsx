import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Link,
    Theme,
    Typography,
} from "@mui/material";
import { Datum } from "../../types/Comment/CommentListType";
import dayjs from "dayjs";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: theme.spacing(1),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        content: {
            "& *": {
                margin: 0,
                padding: 0,
            },
        },
    })
);

export default function CommentBlock(props: { data: Datum }) {
    const classes = useStyles();
    const time = dayjs(props.data.insertedAt);

    const showHtml = (htmlString: string) => {
        const html = { __html: htmlString };
        return <div dangerouslySetInnerHTML={html}></div>;
    };

    return (
        <Card className={classes.card} component={"article"}>
            <CardHeader
                avatar={<Avatar src={props.data.avatar} alt={"Avatar"} />}
                title={
                    <>
                        {props.data.link ? (
                            <Link
                                href={props.data.link}
                                color={"inherit"}
                                underline={"none"}
                                rel={"ugc noopener nofollower"}
                            >
                                <Typography
                                    variant={"subtitle1"}
                                    component={"span"}
                                >
                                    {props.data.nick}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography
                                variant={"subtitle1"}
                                component={"span"}
                            >
                                {props.data.nick}
                            </Typography>
                        )}
                        <Typography
                            variant={"subtitle2"}
                            component={"span"}
                            sx={{ color: "#b9b9b9", ml:1 }}
                        >
                            {time.format("YYYY/MM/DD HH:mm")}
                        </Typography>
                    </>
                }
                subheader={
                <>
                    <Chip label={props.data.os} sx={{mr:1}} size={"small"} />
                    <Chip label={props.data.browser} size={"small"} />
                </>
                }
                sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0, pb: 0 }} component={"main"}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    className={classes.content}
                >
                    {showHtml(props.data.comment)}
                </Typography>
            </CardContent>
        </Card>
    );
}
