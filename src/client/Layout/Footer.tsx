import { Typography } from "@material-tailwind/react";

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-carribean p-8  fixed bottom-0 left-0 right-0">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-carribean text-center md:justify-between">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="orange"
              className="font-normal transition-colors hover:text-orange focus:text-orange"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="orange"
              className="font-normal transition-colors hover:text-orange focus:text-orange"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="orange"
              className="font-normal transition-colors hover:text-orange focus:text-white"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="orange"
              className="font-normal transition-colors hover:text-orange focus:text-orange"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
}
