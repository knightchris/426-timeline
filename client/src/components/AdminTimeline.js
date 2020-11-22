import React from 'react';
import axios from 'axios'
import '../css/Timeline.css';
import AdminTimelineItem from './AdminTimelineItem.js'
import {store} from "react-notifications-component"

class AdminTimeline extends React.Component {
    // let {cards, sortBy, filterBy} = props
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cards: [],
            originalcards: []
        };

        this.handleApproveNewCard = this.handleApproveNewCard.bind(this);
        this.handleDenyCard = this.handleDenyCard.bind(this);
        this.handleApproveEditCard = this.handleApproveEditCard.bind(this);
    }


    async handleApproveNewCard(mediaid) {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/approvenewcard',
            withCredentials: true,
            data: {
              "mediaid": mediaid,
            },
           }); 
           if (result.data === "You are not logged in") {
            store.addNotification({
                title: "You are not logged in",
                message: "Login to approve a card",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "You are not an admin") {
            store.addNotification({
                title: "You are not an admin",
                message: "Only admins can approve cards",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "Media with given mediaid not found") {
            store.addNotification({
                title: "Failure",
                message: "Cannot find item to approve",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "This card is a proposed edit, not new") {
            store.addNotification({
                title: "Failure",
                message: "This card is an edit, not new. Fix your admin interface",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else {
            store.addNotification({
                title: "Success!",
                message: "New card approved",
                type: "success",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
            this.setState({
                cards: this.state.cards.filter((card) => {return card.mediaid !== mediaid}),
                originalcards: this.state.originalcards.filter((card) => {return card.proposededitmediaid !== mediaid})
            })
        }
    }

    async handleApproveEditCard(mediaid, username) {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/approveeditcard',
            withCredentials: true,
            data: {
              "username": username,
              "mediaid": mediaid,
            },
           }); 
           if (result.data === "You are not logged in") {
            store.addNotification({
                title: "You are not logged in",
                message: "Login to approve a card",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "You are not an admin") {
            store.addNotification({
                title: "You are not an admin",
                message: "Only admins can approve edit cards",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "Media with given mediaid not found") {
            store.addNotification({
                title: "Failure",
                message: "Cannot find item to delete",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "This card is not a proposed edit") {
            store.addNotification({
                title: "Failure",
                message: "This card is not an edit. Fix your admin interface",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else {
            store.addNotification({
                title: "Success!",
                message: "Card edit approved",
                type: "success",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
            this.setState({
                cards: this.state.cards.filter((card) => {return card.mediaid !== mediaid}),
                originalcards: this.state.originalcards.filter((card) => {return card.proposededitmediaid !== mediaid})
            })
        }
    }

    async handleDenyCard(mediaid) {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/deletecard',
            withCredentials: true,
            data: {
              "mediaid": mediaid,
            },
           }); 
        if (result.data === "You are not logged in") {
            store.addNotification({
                title: "You are not logged in",
                message: "Login to deny a card",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "You are not an admin") {
            store.addNotification({
                title: "You are not an admin",
                message: "Only admins can delete cards",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "Media with given mediaid not found") {
            store.addNotification({
                title: "Failure",
                message: "Cannot find item to delete",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
        } else {
            store.addNotification({
                title: "Success!",
                message: "Card denied",
                type: "success",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    showIcon: true
                },
                width:270
            })
            this.setState({
                cards: this.state.cards.filter((card) => {return card.mediaid !== mediaid}),
                originalcards: this.state.originalcards.filter((card) => {return card.proposededitmediaid !== mediaid})
            })
        }
    }

    async componentDidMount() {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/mediacards',
            withCredentials: true,
            data: {
                "approved": false
            }
        });
        this.setState({
            cards: await result.data
        });
        for(let card of this.state.cards) {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3000/findcard',
                withCredentials: true,
                data: {
                    "mediaid": card.proposededitmediaid
                }
            });
            this.setState({
                originalcards: [...this.state.originalcards, result.data]
            })
        }
        this.setState({
            isLoaded: true, // Should load even if no cards awaiting approval
        })
    }


    render() {
        const { error, isLoaded } = this.state;
        
        if (error) {
            return <div className="timeline">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="timeline">Loading...</div>;
        } else {
            let adminTimelineItems = [];
            for (let i = 0; i < this.state.cards.length; i++) {
                adminTimelineItems.push(<AdminTimelineItem key={this.state.cards[i].mediaid} 
                                    data={this.state.cards[i]} originalcard={this.state.originalcards[i]}
                                    handleApproveNewCard={this.handleApproveNewCard} handleDenyCard={this.handleDenyCard} 
                                    handleApproveEditCard={this.handleApproveEditCard}></AdminTimelineItem>)
            }
            return (
            <div className="timeline">
                <div className="timeline-content">
                {adminTimelineItems}
                </div>
            </div>
            );
        }
    }

}

export default AdminTimeline;

