import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Select,
  Option,
  Card,
  Textarea,
  Input,
} from "@material-tailwind/react";
import useAxios from "../../hooks/useAxios";
import Container from "../Containar/Container";
import toast from "react-hot-toast";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCampModal = ({ open, setOpen, camp, refetch }) => {
  const axiosSecure = useAxios();
  const [campUpdate, setCampUpdate] = useState({
    campName: "",
    specialServices: "",
    healthcarePros: "",
    location: "",
    image: "",
    campFees: "",
    date: "",
    time: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  console.log(file);

  useEffect(() => {
    if (camp) {
      const { orgName, orgId, _id, orgImage, ...oldCamp } = camp;
      setFile(camp.image);
      setCampUpdate(oldCamp);
    }
  }, [camp]);

  const onChange = (e) => {
    setCampUpdate({
      ...campUpdate,
      [e.target.name]: e.target.value,
    });
  };

  console.log(campUpdate);

  const handelUpdate = async (id) => {
    console.log(id);
    if (typeof file == "object") {
      const imageFile = { image: data.image[0] };

      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const camp = {
          ...campUpdate,
          image: res.data.data.display_url,
        };
        const toastId = toast.loading("Updating Camp...");

        try {
          await axiosSecure.patch(`/update-camp/${id}`, camp);
          toast.success("Updated Added", { id: toastId });
        } catch (error) {
          console.log(error);
          toast.error(error.message, { id: toastId });
        }
      }
    } else {
      const toastId = toast.loading("Updating Camp...");

      try {
        await axiosSecure.patch(`/update-camp/${id}`, campUpdate);
        toast.success("Camp Updated", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error(error.message, { id: toastId });
      }

    }
    refetch()
    setOpen(!open)
    // axios.patch(`/update-camp/${id}`)
    //   .then(res => console.log(res))
    // refetch()
  };
  console.log(camp);

  const specialServicesPvider = [
    "General-Health-Checkups",
    "Dental-Checkups",
    "Vision-Testing",
    "Cancer-Screenings",
    "Diabetes-Consultations",
  ];

  return (
    <>
      <Dialog
        size={"xl"}
        className=" mx-auto object-center overflow-x-scroll max-h-screen"
        open={open}
        handler={() => setOpen(!open)}
      >
        <DialogHeader className="mx-auto">Update Camp</DialogHeader>
        <Container>
          <form onSubmit={(e) => {
            e.preventDefault()

          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4 ">
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Specialized Services Provider
                </Typography>
                <div className="w-full">
                  <Select
                    onChange={(value) => {
                      console.log(value);
                      const e = {
                        target: {
                          name: "specialServices",
                          value: value.split("-").join(" "),
                        },
                      };
                      onChange(e);
                    }}
                    value={campUpdate?.specialServices?.split(" ")?.join("-")}
                    name="specialServices"
                    size="md"
                    required
                    label="Specialized Services Provider"
                  >
                    {specialServicesPvider.map((item, index) => {
                      const label = item.split("-").join(" ");
                      return (
                        <Option key={index} value={item}>
                          {label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Target Audience
                </Typography>
                <div className="w-full">
                  <Select
                    onChange={(value) => {
                      console.log(value);
                      const e = {
                        target: {
                          name: "targetAudience",
                          value: value,
                        },
                      };
                      onChange(e);
                    }}
                    value={campUpdate.targetAudience}
                    name="targetAudience"
                    required
                    label="Specialized Services Provider"
                  >
                    <Option value="Adult">Adult</Option>
                    <Option value="General Public">General Public</Option>
                    <Option value="Children">Children</Option>
                  </Select>
                </div>
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Healthcare Professionals Name
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.healthcarePros}
                  name="healthcarePros"
                  type="text"
                  size="md"
                  placeholder="Healthcare Professionals Name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Camp Name
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.campName}
                  name="campName"
                  type="text"
                  size="md"
                  placeholder="Camp Name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Camp Image
                </Typography>

                <input
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                  name="image"
                  type="file"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
            file:bg-gray-50 file:border-0
            file:bg-gray-100 file:me-4
              file:py-3 file:px-4
            dark:file:bg-gray-700 dark:file:text-gray-400"
                ></input>
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Camp Fees
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.campFees}
                  name="campFees"
                  type="number"
                  size="md"
                  placeholder="Camp Fees"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Scheduled Date
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.date}
                  name="date"
                  type="date"
                  size="md"
                  placeholder="Camp Fees"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Scheduled Time
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.time}
                  name="time"
                  type="time"
                  size="md"
                  placeholder="Camp Fees"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Venue Location
                </Typography>
                <Input
                  onChange={onChange}
                  value={campUpdate.location}
                  name="location"
                  type="text"
                  size="md"
                  placeholder="Venue Location"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="paragraph" color="blue-gray">
                  Camp Description
                </Typography>
                <div className="w-96">
                  <Textarea
                    onChange={onChange}
                    value={campUpdate.description}
                    name="description"
                    size="md"
                    type="text"
                    placeholder="Camp Description"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
              <Button
                variant="text"
                color="red"
                onClick={() => setOpen(!open)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button onClick={() => handelUpdate(camp._id)} variant="gradient" color="green">
                <span>Confirm</span>
              </Button>
            </div>
          </form>
        </Container>
      </Dialog>
    </>
  );
};

export default UpdateCampModal;
