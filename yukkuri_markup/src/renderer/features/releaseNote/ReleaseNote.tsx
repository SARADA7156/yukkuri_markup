import { useEffect } from "react";

export default function ReleaseNote() {
    useEffect(() => {
        fetch("./docs/release-notes/v1.0.0.md")
            .then(response => response.text())
            .then((text) => {
                console.log(text)
            });
    }, []);

    return (
        <></>
    );
}