"use client";
import { useSnapshot } from "valtio";
import { useState } from "react";
import { useForm } from "react-hook-form";
import utilStore from "@/store/utilStore";
import { toast } from "react-toastify";

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const utilsSnap = useSnapshot(utilStore);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const obj = {...data, interest: selectedCategory.name};
    console.log("Prepared Data:", obj);

    const [result, error] = await utilStore.createNewContact(obj);
    if (error) {
      toast.error(error);
      return;
    }

    if (result) {
      if (result.message) {
        toast.success(result.message);
      } else {
        toast.success("Contact created successfully!");
      }
    }

    reset();
    setSelectedCategory(categories[0]);
  };

  const [categories, setCategories] = useState([
    { name: "Web Design", value: "web-design" },
    { name: "Products & SaaS", value: "products-saas" },
    { name: "UI UX Design", value: "ui-ux-design" },
    { name: "Graphics Design", value: "graphics-design" },
    { name: "Development", value: "development" },
    { name: "Digital Marketing", value: "digital-marketing" },
    { name: "Others", value: "others" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="right">
      <p>I’m interested in...</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="interest">
            {categories.map((tag) => (
              <span className={tag.value === selectedCategory.value ? "active" : ""} onClick={() => setSelectedCategory(tag)} key={tag.value}>{tag.name}</span>
            ))}
          </div>

          <div className="field">
            <input
              {...register("name")}
              placeholder="Your name"
              type="text"
              required
              className="input-textarea"
            />
            <input
              {...register("contact")}
              placeholder="Contact number (Optional)"
              type="number"
              name="contact number"
              className="input-textarea"
            />
            <input
              {...register("email")}
              placeholder="Your email"
              type="email"
              required
              className="input-textarea"
            />
            <textarea
              {...register("message")}
              placeholder="Your message"
              className="input-textarea"
              required
              rows="5"
            ></textarea>
          </div>
        </div>

        <div className="btn">
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;