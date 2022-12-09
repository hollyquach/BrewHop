import React, { useState } from 'react';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    return (
        <div>
            <h1>Contact Us</h1>
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={e =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={e =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </label>
                <br />
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={e =>
                            setFormData({ ...formData, message: e.target.value })
                        }
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <div>
                <h2>Our Location</h2>
                <p>123 Main Street</p>
                <p>City, State 12345</p>
            </div>
            <div>
                <h2>Connect with us</h2>
                <p>
                    <a href="https://www.facebook.com/">Facebook</a>
                </p>
                <p>
                    <a href="https://www.twitter.com/">Twitter</a>
                </p>
                <p>
                    <a href="https://www.instagram.com/">Instagram</a>
                </p>
            </div>
        </div>
    )
}