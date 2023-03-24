import React from "react"
import { Heading } from "theme-ui"

export const Contact = () => {
    return (
        <React.Fragment>
            <Heading className="mt-2">Contacts</Heading>
          <address>
            <a target="_blank" href="mailto:ankaszymczyk@op.pl">ankaszymczyk@op.pl</a> <br />
            <a target="_blank" href="tel:+31686419489">+31 6 86419489</a> <br />
            Zandvoort, The Netherlands
          </address>
        </React.Fragment>
    )
}