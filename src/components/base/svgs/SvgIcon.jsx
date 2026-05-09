export function ClockPlusSvg({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10 4V10H14.5M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export const ArrowRightSvg = ({ className, stroke = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M1.25 1.5L8.75 9L1.25 16.5"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



export const TrashSvg = ({ className, stroke = "#191919", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M11.7404 8L11.3942 17M6.60577 17L6.25962 8M16.2276 4.79057C16.5696 4.84221 16.9104 4.89747 17.25 4.95629M16.2276 4.79057L15.1598 18.6726C15.0696 19.8448 14.0921 20.75 12.9164 20.75H5.08357C3.90786 20.75 2.93037 19.8448 2.8402 18.6726L1.77235 4.79057M16.2276 4.79057C15.0812 4.61744 13.9215 4.48485 12.75 4.39432M0.75 4.95629C1.08957 4.89747 1.43037 4.84221 1.77235 4.79057M1.77235 4.79057C2.91878 4.61744 4.07849 4.48485 5.25 4.39432M12.75 4.39432V3.47819C12.75 2.29882 11.8393 1.31423 10.6606 1.27652C10.1092 1.25889 9.55565 1.25 9 1.25C8.44435 1.25 7.89078 1.25889 7.33942 1.27652C6.16065 1.31423 5.25 2.29882 5.25 3.47819V4.39432M12.75 4.39432C11.5126 4.2987 10.262 4.25 9 4.25C7.73803 4.25 6.48744 4.2987 5.25 4.39432"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ContactSvg = ({ className, stroke = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="22"
    height="44"
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    <path
      stroke={'none'}
      fill={stroke}
      id="_x31_6_laptop"
      d="M62.674 49.88c-.411-.583-1.152-.96-1.888-.96h-.725V17.226c0-1.743-1.42-3.16-3.164-3.16H45.805v-3.1a3.784 3.784 0 0 0-3.78-3.78h-21.17a3.786 3.786 0 0 0-3.783 3.78v3.1H7.103a3.166 3.166 0 0 0-3.164 3.16V48.92h-.725c-.735 0-1.477.377-1.888.96a1.68 1.68 0 0 0-.23 1.547l1.247 3.544c.431 1.223 1.144 1.843 2.119 1.843h55.076c.975 0 1.688-.62 2.119-1.843l1.246-3.539a1.68 1.68 0 0 0-.23-1.551M20.855 28.215h2.802v4.317a1 1 0 0 0 2 0v-4.317h4.783v7.241a1 1 0 0 0 2 0v-7.241h4.917v4.317a1 1 0 0 0 2 0v-4.317h2.668a3.784 3.784 0 0 0 3.78-3.78v-3.708h7.05v23.61h-41.71v-23.61h5.927v3.708a3.786 3.786 0 0 0 3.783 3.78m.438-2 7.674-7.317 1.816 1.583a1 1 0 0 0 1.315-.001l2.145-1.872 7.99 7.586c-.07.008-.137.02-.208.02zm22.4-15.852c.068.19.112.39.112.604v13.468c0 .152-.025.296-.06.437l-7.988-7.585zm-1.696-1.176L31.44 18.398 20.873 9.186zm-22.925 1.78c0-.211.043-.411.111-.6l8.27 7.211-8.13 7.752a1.76 1.76 0 0 1-.251-.895zm-13.133 6.26c0-.64.522-1.16 1.164-1.16h9.969v2.66h-6.927a1 1 0 0 0-1 1v25.61a1 1 0 0 0 1 1h43.71a1 1 0 0 0 1-1v-25.61a1 1 0 0 0-1-1h-8.05v-2.66h11.092c.642 0 1.164.52 1.164 1.16v31.693H41.32c-.294 0-.572.145-.762.37s-.271.535-.224.824a.48.48 0 0 1-.473.473H24.14c-.257 0-.473-.216-.472-.504a1 1 0 0 0-.987-1.163H5.94zm53.831 37.08c-.14.4-.241.502-.235.508H4.48c-.036-.038-.128-.16-.25-.507l-1.177-3.34a.4.4 0 0 1 .16-.047h18.588a2.48 2.48 0 0 0 2.338 1.666H39.86A2.48 2.48 0 0 0 42.2 50.92h18.587c.049 0 .11.02.16.046z"
    ></path>
  </svg>
);


export const DotsVerticalSvg = ({ className, fill = "#191919", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="18"
    viewBox="0 0 4 18"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M1.99995 0.600098C2.99406 0.600098 3.79995 1.40599 3.79995 2.4001C3.79995 3.39421 2.99406 4.2001 1.99995 4.2001C1.00584 4.2001 0.199951 3.39421 0.199951 2.4001C0.199951 1.40598 1.00584 0.600098 1.99995 0.600098Z"
      fill={fill}
    />
    <path
      d="M1.99995 7.2001C2.99406 7.2001 3.79995 8.00598 3.79995 9.0001C3.79995 9.99421 2.99406 10.8001 1.99995 10.8001C1.00584 10.8001 0.199951 9.99421 0.199951 9.0001C0.199951 8.00598 1.00584 7.2001 1.99995 7.2001Z"
      fill={fill}
    />
    <path
      d="M3.79995 15.6001C3.79995 14.606 2.99406 13.8001 1.99995 13.8001C1.00584 13.8001 0.199951 14.606 0.199951 15.6001C0.199951 16.5942 1.00584 17.4001 1.99995 17.4001C2.99406 17.4001 3.79995 16.5942 3.79995 15.6001Z"
      fill={fill}
    />
  </svg>
);


export const EditSvg = ({ className, stroke = "#191919", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M16.8617 4.48667L18.5492 2.79917C19.2814 2.06694 20.4686 2.06694 21.2008 2.79917C21.9331 3.53141 21.9331 4.71859 21.2008 5.45083L10.5822 16.0695C10.0535 16.5981 9.40144 16.9868 8.68489 17.2002L6 18L6.79978 15.3151C7.01323 14.5986 7.40185 13.9465 7.93052 13.4178L16.8617 4.48667ZM16.8617 4.48667L19.5 7.12499M18 14V18.75C18 19.9926 16.9926 21 15.75 21H5.25C4.00736 21 3 19.9926 3 18.75V8.24999C3 7.00735 4.00736 5.99999 5.25 5.99999H10"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export const DashboardSvg = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M3.75 6C3.75 4.75736 4.75736 3.75 6 3.75H8.25C9.49264 3.75 10.5 4.75736 10.5 6V8.25C10.5 9.49264 9.49264 10.5 8.25 10.5H6C4.75736 10.5 3.75 9.49264 3.75 8.25V6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 15.75C3.75 14.5074 4.75736 13.5 6 13.5H8.25C9.49264 13.5 10.5 14.5074 10.5 15.75V18C10.5 19.2426 9.49264 20.25 8.25 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V15.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 6C13.5 4.75736 14.5074 3.75 15.75 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V8.25C20.25 9.49264 19.2426 10.5 18 10.5H15.75C14.5074 10.5 13.5 9.49264 13.5 8.25V6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 15.75C13.5 14.5074 14.5074 13.5 15.75 13.5H18C19.2426 13.5 20.25 14.5074 20.25 15.75V18C20.25 19.2426 19.2426 20.25 18 20.25H15.75C14.5074 20.25 13.5 19.2426 13.5 18V15.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export const SubscriberSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      d="M8.8132 14.9038L8 17.75L7.1868 14.9038C6.75968 13.4089 5.59112 12.2403 4.09619 11.8132L1.25 11L4.09619 10.1868C5.59113 9.75968 6.75968 8.59112 7.1868 7.09619L8 4.25L8.8132 7.09619C9.24032 8.59113 10.4089 9.75968 11.9038 10.1868L14.75 11L11.9038 11.8132C10.4089 12.2403 9.24032 13.4089 8.8132 14.9038Z"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.2589 7.71454L17 8.75L16.7411 7.71454C16.4388 6.50533 15.4947 5.56117 14.2855 5.25887L13.25 5L14.2855 4.74113C15.4947 4.43883 16.4388 3.49467 16.7411 2.28546L17 1.25L17.2589 2.28546C17.5612 3.49467 18.5053 4.43883 19.7145 4.74113L20.75 5L19.7145 5.25887C18.5053 5.56117 17.5612 6.50533 17.2589 7.71454Z"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8942 19.5673L15.5 20.75L15.1058 19.5673C14.8818 18.8954 14.3546 18.3682 13.6827 18.1442L12.5 17.75L13.6827 17.3558C14.3546 17.1318 14.8818 16.6046 15.1058 15.9327L15.5 14.75L15.8942 15.9327C16.1182 16.6046 16.6454 17.1318 17.3173 17.3558L18.5 17.75L17.3173 18.1442C16.6454 18.3682 16.1182 18.8954 15.8942 19.5673Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BlogSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    {...props}
  >
    <path
      d="M12.75 16.25V19.625C12.75 20.2463 12.2463 20.75 11.625 20.75H1.875C1.25368 20.75 0.75 20.2463 0.75 19.625V6.875C0.75 6.25368 1.25368 5.75 1.875 5.75H3.75C4.26107 5.75 4.76219 5.7926 5.25 5.87444M12.75 16.25H16.125C16.7463 16.25 17.25 15.7463 17.25 15.125V10.25C17.25 5.79051 14.0066 2.08855 9.75 1.37444C9.26219 1.2926 8.76107 1.25 8.25 1.25H6.375C5.75368 1.25 5.25 1.75368 5.25 2.375V5.87444M12.75 16.25H6.375C5.75368 16.25 5.25 15.7463 5.25 15.125V5.87444M17.25 12.5V10.625C17.25 8.76104 15.739 7.25 13.875 7.25H12.375C11.7537 7.25 11.25 6.74632 11.25 6.125V4.625C11.25 2.76104 9.73896 1.25 7.875 1.25H6.75"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ResourceSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="19"
    viewBox="0 0 22 19"
    fill="none"
    {...props}
  >
    <path
      d="M17.0002 15.7191C17.2477 15.7396 17.498 15.75 17.7508 15.75C18.7992 15.75 19.8056 15.5708 20.7413 15.2413C20.7476 15.1617 20.7508 15.0812 20.7508 15C20.7508 13.3431 19.4077 12 17.7508 12C17.1232 12 16.5406 12.1927 16.059 12.5222M17.0002 15.7191C17.0002 15.7294 17.0002 15.7397 17.0002 15.75C17.0002 15.975 16.9879 16.1971 16.9637 16.4156C15.207 17.4237 13.1709 18 11.0002 18C8.82957 18 6.79352 17.4237 5.03675 16.4156C5.01263 16.1971 5.00024 15.975 5.00024 15.75C5.00024 15.7397 5.00027 15.7295 5.00032 15.7192M17.0002 15.7191C16.9943 14.5426 16.6497 13.4461 16.059 12.5222M16.059 12.5222C14.9931 10.8552 13.1257 9.75 11.0002 9.75C8.87504 9.75 7.0079 10.8549 5.94193 12.5216M5.94193 12.5216C5.46047 12.1925 4.8782 12 4.25098 12C2.59412 12 1.25098 13.3431 1.25098 15C1.25098 15.0812 1.2542 15.1617 1.26054 15.2413C2.19617 15.5708 3.20264 15.75 4.25098 15.75C4.50332 15.75 4.75323 15.7396 5.00032 15.7192M5.94193 12.5216C5.35095 13.4457 5.00623 14.5424 5.00032 15.7192M14.0002 3.75C14.0002 5.40685 12.6571 6.75 11.0002 6.75C9.34339 6.75 8.00024 5.40685 8.00024 3.75C8.00024 2.09315 9.34339 0.75 11.0002 0.75C12.6571 0.75 14.0002 2.09315 14.0002 3.75ZM20.0002 6.75C20.0002 7.99264 18.9929 9 17.7502 9C16.5076 9 15.5002 7.99264 15.5002 6.75C15.5002 5.50736 16.5076 4.5 17.7502 4.5C18.9929 4.5 20.0002 5.50736 20.0002 6.75ZM6.50024 6.75C6.50024 7.99264 5.49288 9 4.25024 9C3.0076 9 2.00024 7.99264 2.00024 6.75C2.00024 5.50736 3.0076 4.5 4.25024 4.5C5.49288 4.5 6.50024 5.50736 6.50024 6.75Z"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CallSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      d="M1.25 5.75C1.25 14.0343 7.96573 20.75 16.25 20.75H18.5C19.7426 20.75 20.75 19.7426 20.75 18.5V17.1284C20.75 16.6121 20.3987 16.1622 19.8979 16.037L15.4747 14.9312C15.0355 14.8214 14.5734 14.9855 14.3018 15.3476L13.3316 16.6412C13.05 17.0166 12.563 17.1827 12.1223 17.0212C8.81539 15.8098 6.19015 13.1846 4.97876 9.87766C4.81734 9.43699 4.98336 8.94998 5.3588 8.6684L6.65242 7.69818C7.01453 7.4266 7.17861 6.96445 7.06883 6.52533L5.96304 2.10215C5.83783 1.60133 5.38785 1.25 4.87163 1.25H3.5C2.25736 1.25 1.25 2.25736 1.25 3.5V5.75Z"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SettingsSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M8.34235 1.94005C8.43276 1.39759 8.9021 1 9.45204 1H10.546C11.0959 1 11.5653 1.39759 11.6557 1.94005L11.8047 2.83386C11.8754 3.25813 12.1883 3.59838 12.5856 3.76332C12.983 3.92832 13.4393 3.90629 13.7895 3.65617L14.527 3.12933C14.9746 2.80969 15.5876 2.86042 15.9764 3.24929L16.75 4.02284C17.1389 4.41171 17.1896 5.02472 16.8699 5.47223L16.3429 6.21007C16.0929 6.56012 16.0708 7.01633 16.2358 7.41363C16.4007 7.81078 16.7408 8.12363 17.165 8.19433L18.059 8.34332C18.6014 8.43373 18.999 8.90307 18.999 9.45302V10.547C18.999 11.0969 18.6014 11.5663 18.059 11.6567L17.1651 11.8056C16.7409 11.8764 16.4006 12.1893 16.2357 12.5865C16.0707 12.9839 16.0927 13.4403 16.3429 13.7904L16.8696 14.5278C17.1892 14.9753 17.1385 15.5884 16.7496 15.9772L15.9761 16.7508C15.5872 17.1396 14.9742 17.1904 14.5267 16.8707L13.7891 16.3439C13.439 16.0938 12.9828 16.0718 12.5854 16.2367C12.1883 16.4016 11.8754 16.7418 11.8047 17.166L11.6557 18.0599C11.5653 18.6024 11.0959 19 10.546 19H9.45204C8.9021 19 8.43276 18.6024 8.34235 18.0599L8.19338 17.1661C8.12267 16.7419 7.80975 16.4016 7.41251 16.2367C7.0151 16.0717 6.55877 16.0937 6.20862 16.3438L5.471 16.8707C5.0235 17.1904 4.41048 17.1396 4.02161 16.7507L3.24806 15.9772C2.8592 15.5883 2.80846 14.9753 3.12811 14.5278L3.65514 13.79C3.90518 13.4399 3.92723 12.9837 3.76228 12.5864C3.59739 12.1892 3.25722 11.8764 2.83304 11.8057L1.93907 11.6567C1.39661 11.5663 0.999023 11.0969 0.999023 10.547V9.45302C0.999023 8.90307 1.39661 8.43373 1.93907 8.34332L2.83288 8.19436C3.25715 8.12364 3.59741 7.81071 3.76234 7.41347C3.92735 7.01605 3.90531 6.5597 3.6552 6.20954L3.1285 5.47216C2.80885 5.02465 2.85959 4.41164 3.24846 4.02277L4.02201 3.24922C4.41088 2.86036 5.02389 2.80962 5.4714 3.12927L6.20899 3.65613C6.55907 3.90618 7.0153 3.92822 7.41263 3.76326C7.80979 3.59837 8.12266 3.25819 8.19336 2.834L8.34235 1.94005Z"
       stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9997 10C12.9997 11.6569 11.6566 13 9.99972 13C8.34287 13 6.99972 11.6569 6.99972 10C6.99972 8.34317 8.34287 7.00002 9.99972 7.00002C11.6566 7.00002 12.9997 8.34317 12.9997 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);




export const LocationSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
<path d="M40.6663 73.3346C22.2563 73.3346 7.33301 58.4113 7.33301 40.0013C7.33301 21.5913 22.2563 6.66797 40.6663 6.66797C59.0763 6.66797 73.9997 21.5913 73.9997 40.0013C73.9997 58.4113 59.0763 73.3346 40.6663 73.3346ZM40.6663 66.668C47.7388 66.668 54.5215 63.8584 59.5225 58.8575C64.5235 53.8565 67.333 47.0737 67.333 40.0013C67.333 32.9289 64.5235 26.1461 59.5225 21.1451C54.5215 16.1441 47.7388 13.3346 40.6663 13.3346C33.5939 13.3346 26.8111 16.1441 21.8102 21.1451C16.8092 26.1461 13.9997 32.9289 13.9997 40.0013C13.9997 47.0737 16.8092 53.8565 21.8102 58.8575C26.8111 63.8584 33.5939 66.668 40.6663 66.668ZM23.9997 38.3346L53.9997 26.668L42.333 56.6746L37.333 43.3346L23.9997 38.3346Z" fill="white"/>
</svg>
);

export const LocationSvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 124 124"
  >
    <g filter="url(#filter0_dd_211_448)">
      <path
        fill="#fff"
        d="M58 99.667c-23.012 0-41.666-18.655-41.666-41.667 0-23.013 18.654-41.667 41.667-41.667 23.012 0 41.666 18.654 41.666 41.667 0 23.012-18.654 41.667-41.666 41.667m0-8.334a33.333 33.333 0 1 0 0-66.666 33.333 33.333 0 0 0 0 66.666M37.168 55.917l37.5-14.584-14.583 37.509-6.25-16.675z"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_448"
        
        
        x="-8"
        y="-8"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_448"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_448"
          result="effect2_dropShadow_211_448"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_448"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const DefineSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 81 81"
  >
    <path
      fill="#fff"
      d="M40.71.904q-.195.036-.384.096a3.08 3.08 0 0 0-2.403 3.077v3.27C21.73 8.816 8.815 21.73 7.345 37.924H4.077a3.08 3.08 0 1 0 0 6.154h3.27C8.816 60.27 21.73 73.184 37.924 74.655v3.268a3.077 3.077 0 0 0 6.154 0v-3.27c16.194-1.469 29.108-14.382 30.578-30.576h3.268a3.077 3.077 0 1 0 0-6.154h-3.27C73.184 21.729 60.272 8.815 44.076 7.344V4.077A3.077 3.077 0 0 0 40.711.904m-2.787 15.671v2.886a3.077 3.077 0 0 0 6.154 0v-2.886a24.57 24.57 0 0 1 21.348 21.348h-2.886a3.08 3.08 0 1 0 0 6.154h2.886a24.57 24.57 0 0 1-21.348 21.347v-2.886a3.077 3.077 0 1 0-6.154 0v2.886a24.57 24.57 0 0 1-21.348-21.347h2.887a3.076 3.076 0 1 0 0-6.154h-2.887a24.57 24.57 0 0 1 21.348-21.348"
    ></path>
  </svg>
);

export const DefineSvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 141 132"
  >
    <g filter="url(#filter0_dd_211_446)">
      <path
        fill="#fff"
        d="M66.638 15.88q-.244.045-.48.12a3.846 3.846 0 0 0-3.005 3.846v4.089C42.911 25.769 26.77 41.912 24.93 62.154h-4.084a3.85 3.85 0 1 0 0 7.692h4.088c1.835 20.242 17.977 36.385 38.22 38.223v4.085A3.85 3.85 0 0 0 66.998 116a3.847 3.847 0 0 0 3.847-3.846v-4.089c20.242-1.834 36.384-17.976 38.223-38.219h4.084a3.847 3.847 0 1 0 0-7.692h-4.088c-1.835-20.242-17.973-36.385-38.22-38.223v-4.085a3.846 3.846 0 0 0-4.207-3.965m-3.485 19.59v3.607a3.846 3.846 0 1 0 7.693 0v-3.608A30.716 30.716 0 0 1 97.53 62.154h-3.607a3.85 3.85 0 1 0 0 7.692h3.607a30.715 30.715 0 0 1-26.684 26.685v-3.608a3.845 3.845 0 0 0-4.689-3.846 3.85 3.85 0 0 0-3.004 3.846v3.608A30.716 30.716 0 0 1 36.47 69.846h3.607a3.846 3.846 0 0 0 0-7.692H36.47a30.715 30.715 0 0 1 26.684-26.685"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_446"
        
        
        x="0.814"
        y="-0.136"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_446"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_446"
          result="effect2_dropShadow_211_446"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_446"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const DesignSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 81 80"
  >
    <path
      fill="#fff"
      d="M18.916 6.912a2.5 2.5 0 0 1 1.417 2.253c0 2.767 1.04 4.36 2.343 6.3l.097.14c1.107 1.647 2.56 3.803 2.56 6.893a9.167 9.167 0 1 1-18.333 0c0-1.226 0-3.336 1.276-6.06 1.25-2.666 3.627-5.73 7.994-9.226a2.5 2.5 0 0 1 2.646-.3m-2.75 29.753a14.1 14.1 0 0 0 7.883-2.393c.87 2.447 1.284 5.7 1.284 9.91 0 5.706-.767 12.56-2.017 18.033-.62 2.72-1.39 5.23-2.306 7.114a10 10 0 0 1-1.7 2.566c-.687.704-1.744 1.454-3.144 1.454s-2.456-.75-3.14-1.454a10 10 0 0 1-1.7-2.566c-.92-1.887-1.69-4.394-2.31-7.117A86.7 86.7 0 0 1 7 44.178c0-4.206.413-7.46 1.283-9.906a14.1 14.1 0 0 0 7.883 2.393m12.447 10.257a16.7 16.7 0 0 0 5.053 1.327v-7.417A10.833 10.833 0 0 1 44.5 29.999h7.416a16.667 16.667 0 0 0-24.48-13.014 21.3 21.3 0 0 0-1.826-3.133l-.167-.247-.597-.907a21.665 21.665 0 0 1 32.09 17.3h5.897a10.834 10.834 0 0 1 10.833 10.834v18.333A10.83 10.83 0 0 1 62.833 70H44.5a10.833 10.833 0 0 1-10.834-10.834V53.27a21.7 21.7 0 0 1-5.403-1.117c.166-1.767.286-3.527.35-5.23m34.22-11.923h-6.087a21.68 21.68 0 0 1-18.08 18.08v6.086A5.835 5.835 0 0 0 44.5 65h18.333a5.833 5.833 0 0 0 5.833-5.834V40.832a5.833 5.833 0 0 0-5.833-5.834m-24.167 13a16.7 16.7 0 0 0 13-13H44.5a5.833 5.833 0 0 0-5.834 5.833z"
    ></path>
  </svg>
);

export const DesignSvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 124 124"
  >
    <g filter="url(#filter0_dd_211_445)">
      <path
        fill="#fff"
        d="M31.23 16.642A3.13 3.13 0 0 1 33 19.458c0 3.459 1.3 5.45 2.93 7.875l.12.175c1.384 2.059 3.2 4.755 3.2 8.617a11.459 11.459 0 0 1-22.916 0c0-1.533 0-4.17 1.596-7.575 1.562-3.333 4.533-7.163 9.992-11.533a3.13 3.13 0 0 1 3.308-.375m-3.438 37.191c3.51.006 6.94-1.035 9.855-2.991 1.087 3.058 1.604 7.125 1.604 12.387 0 7.133-.959 15.7-2.521 22.542-.775 3.4-1.738 6.537-2.883 8.891a12.5 12.5 0 0 1-2.126 3.209c-.858.879-2.179 1.817-3.929 1.817s-3.07-.938-3.925-1.817a12.5 12.5 0 0 1-2.125-3.209c-1.15-2.358-2.112-5.491-2.887-8.895a108.3 108.3 0 0 1-2.521-22.542c0-5.258.517-9.325 1.604-12.383a17.63 17.63 0 0 0 9.854 2.991m15.559 12.821a20.8 20.8 0 0 0 6.316 1.659v-9.271A13.543 13.543 0 0 1 63.21 45.5h9.27a20.833 20.833 0 0 0-30.6-16.267 26.7 26.7 0 0 0-2.282-3.916l-.209-.309-.746-1.133A27.084 27.084 0 0 1 78.755 45.5h7.37a13.54 13.54 0 0 1 13.542 13.542v22.916A13.54 13.54 0 0 1 86.126 95.5H63.209a13.54 13.54 0 0 1-13.542-13.542v-7.37a27 27 0 0 1-6.754-1.396c.209-2.209.359-4.409.438-6.538M86.126 51.75h-7.609a27.1 27.1 0 0 1-22.6 22.6v7.608a7.294 7.294 0 0 0 7.292 7.292h22.917a7.29 7.29 0 0 0 7.291-7.292V59.042a7.29 7.29 0 0 0-7.291-7.292M55.917 68a20.87 20.87 0 0 0 16.25-16.25H63.21a7.29 7.29 0 0 0-7.292 7.292z"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_445"
        
        
        x="-8"
        y="-8"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_445"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_445"
          result="effect2_dropShadow_211_445"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_445"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const DevelopmentSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 81 80"
  >
    <path
      fill="#fff"
      d="M49.4 8.873a5 5 0 0 1 3.467 6.167l-14.77 52.623a5 5 0 1 1-9.63-2.7l14.77-52.63a5 5 0 0 1 6.166-3.463zm-23.533 13.45a5 5 0 0 1 0 7.067L15.267 40l10.606 10.607a5 5 0 0 1-7.073 7.07L4.657 43.533a5 5 0 0 1 0-7.066l14.14-14.144a5 5 0 0 1 5.45-1.084c.607.251 1.155.62 1.62 1.084m29.6 7.067a5 5 0 1 1 7.066-7.067l14.144 14.14a5 5 0 0 1 0 7.07l-14.14 14.144a5 5 0 1 1-7.074-7.07L66.07 40z"
    ></path>
  </svg>
);

export const DevelopmentSvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 134 120"
  >
    <g filter="url(#filter0_dd_211_444)">
      <path
        fill="#fff"
        d="M73.917 17.092a6.25 6.25 0 0 1 4.334 7.708L59.788 90.58a6.251 6.251 0 0 1-12.037-3.376l18.462-65.787a6.25 6.25 0 0 1 7.708-4.33zM44.501 33.904a6.25 6.25 0 0 1 0 8.833L31.25 56l13.258 13.258a6.25 6.25 0 0 1-8.842 8.838l-17.679-17.68a6.25 6.25 0 0 1 0-8.833l17.675-17.679a6.25 6.25 0 0 1 6.814-1.356 6.2 6.2 0 0 1 2.024 1.356m37 8.833a6.25 6.25 0 1 1 8.833-8.833l17.679 17.675a6.25 6.25 0 0 1 0 8.838L90.338 78.096a6.25 6.25 0 1 1-8.842-8.838L94.755 56z"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_444"
        
        
        x="-3"
        y="-10"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_444"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_444"
          result="effect2_dropShadow_211_444"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_444"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const DeploySvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 80 80"
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M72.266 30h.9a33.334 33.334 0 0 0-66.333 0h.833l13.867 20.067 2.733-1.9L11.7 30h7.9a4.167 4.167 0 1 1 8.333 0h1.4L33.5 43.334l3.166-1L32.833 30h3a4.167 4.167 0 1 1 8.333 0h3l-3.833 12.334 3.167 1L50.666 30H52.1a4.167 4.167 0 1 1 8.333 0h7.8L55.666 48.167l2.734 1.9zM31.953 46.667l4.714 4.683-12.06 11.984 12.06 11.983L31.953 80 15.18 63.334l4.713-4.684zM48.117 80l-4.714-4.683 12.06-11.983-12.06-11.984 4.714-4.683L64.89 63.334l-4.714 4.683z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const DeploySvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="124"
    height="132"
    fill="none"
    viewBox="0 0 124 132"
  >
    <g filter="url(#filter0_dd_211_447)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M98.333 53.5h1.125a41.666 41.666 0 0 0-82.917 0h1.042l17.333 25.083 3.417-2.375L22.624 53.5H32.5a5.209 5.209 0 0 1 10.417 0h1.75l5.208 16.667 3.959-1.25L49.04 53.5h3.75a5.208 5.208 0 1 1 10.417 0h3.75l-4.792 15.417 3.958 1.25L71.333 53.5h1.791a5.209 5.209 0 0 1 10.417 0h9.75L77.583 76.208l3.416 2.375zM47.94 74.333l5.892 5.854-15.075 14.98 15.075 14.979L47.94 116 26.975 95.167l5.891-5.855zM68.145 116l-5.891-5.854 15.075-14.98-15.075-14.979 5.891-5.854 20.967 20.834-5.892 5.854z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_447"
        width="140"
        height="140.005"
        x="-8"
        y="-0.005"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_447"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_447"
          result="effect2_dropShadow_211_447"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_447"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const DeliverSvg = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 81 80"
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M42.4 62.127q.424.14.865.185c.423.043.854.019 1.276-.076l.188-.037.169-.033.002-.001.624-.124a1226 1226 0 0 1 11.796-2.277c3.324-.624 6.73-1.243 9.504-1.705q.915-.153 1.716-.278c-1.733 1.64-4.912 4.357-8.688 6.76-4.407 2.804-9.022 4.791-12.852 4.791-4.323 0-7.979-1.07-11.652-2.295q-.555-.185-1.13-.381c-3.193-1.083-6.85-2.324-10.552-2.324H7a4 4 0 0 0 0 8h16.667c2.302 0 4.652.788 8.135 1.955l1.016.34c3.827 1.276 8.504 2.705 14.182 2.705 6.169 0 12.387-3.013 17.147-6.042 4.871-3.1 8.846-6.628 10.68-8.463 1.975-1.974 3.672-4.606 3.672-7.412 0-1.555-.551-3.26-1.99-4.52-1.37-1.199-3.053-1.563-4.51-1.563-1.246 0-3.83.392-6.49.836-2.853.475-6.321 1.106-9.664 1.732-.924.174-1.84.347-2.733.517.2-1.509-.05-3.224-1.246-4.818-.665-.886-1.557-1.63-2.357-2.215-.85-.623-1.844-1.242-2.902-1.838-2.12-1.195-4.699-2.412-7.366-3.501-2.672-1.09-5.506-2.083-8.147-2.81C28.523 36.528 25.873 36 23.666 36c-4.29 0-8.323 1.59-11.568 3.443-3.278 1.874-6.055 4.19-7.927 6.062a4 4 0 1 0 5.657 5.656c1.462-1.462 3.685-3.311 6.24-4.771 2.588-1.48 5.222-2.39 7.598-2.39 1.127 0 2.956.304 5.306.95 2.282.628 4.812 1.51 7.245 2.503 2.437.995 4.7 2.07 6.461 3.063.882.497 1.588.945 2.108 1.325l.032.025.028.022c-.158.219-.374.486-.66.793-.4.425-.841.83-1.262 1.188l-7.993-2.664a4 4 0 0 0-2.53 7.589zm-10-3.334 1.267-3.794 1.264-3.795zM23 29.999V16.665c0-1.945.772-3.81 2.147-5.185l.264-.25a7.33 7.33 0 0 1 4.921-1.898h40c1.824 0 3.577.68 4.922 1.897l.264.25.251.264a7.33 7.33 0 0 1 1.897 4.922v26.667a4 4 0 0 1-8 0v-26h-11v11H42v-11H31v12.667a4 4 0 0 1-8 0"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const DeliverSvgHovered = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 120"
  >
    <g filter="url(#filter0_dd_211_443)">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M49.5 24.667a.167.167 0 0 0-.166.166V41.5a4 4 0 0 1-8 0V24.833a8.167 8.167 0 0 1 8.167-8.166h50a8.164 8.164 0 0 1 8.166 8.166v33.334a4 4 0 0 1-8 0V24.833a.166.166 0 0 0-.166-.166H84.917v14.75H64.084v-14.75zM31.174 61.119c-3.285 1.877-6.132 4.248-8.01 6.126a4 4 0 1 1-5.657-5.657c2.288-2.288 5.69-5.125 9.698-7.415C31.178 51.902 36.044 50 41.167 50c2.624 0 5.833.634 9.02 1.51 3.256.896 6.76 2.123 10.07 3.474 3.305 1.35 6.49 2.852 9.095 4.32 1.301.734 2.507 1.486 3.529 2.234.97.71 1.994 1.572 2.736 2.562 1.685 2.247 1.669 4.718 1.059 6.69 1.573-.302 3.226-.616 4.9-.93 4.176-.783 8.504-1.57 12.059-2.162 3.364-.561 6.494-1.031 7.949-1.031 1.664 0 3.504.416 4.978 1.706 1.544 1.35 2.147 3.187 2.147 4.898 0 3.118-1.906 6.167-4.297 8.558-2.251 2.25-7.163 6.612-13.18 10.442-5.906 3.758-13.478 7.396-20.898 7.396-6.927 0-12.646-1.742-17.41-3.33q-.675-.225-1.31-.44h-.002c-4.296-1.441-7.393-2.48-10.445-2.48H20.334a4 4 0 1 1 0-8h20.833c4.45 0 8.854 1.492 12.867 2.852q.718.244 1.42.478c4.61 1.537 9.307 2.92 14.88 2.92 5.08 0 11.05-2.612 16.602-6.146 5.442-3.462 9.904-7.434 11.82-9.35.482-.481.862-.934 1.155-1.34-1.159.15-2.837.404-4.961.758-3.476.58-7.743 1.355-11.9 2.134A1477 1477 0 0 0 67.3 80.77l-.258.052a4 4 0 0 1-2.178-.123l-12.462-4.153a4 4 0 1 1 2.53-7.59l10.517 3.506a21 21 0 0 0 2.097-1.926c.748-.797 1.198-1.454 1.405-1.904a10 10 0 0 0-.794-.636c-.69-.505-1.61-1.088-2.733-1.721-2.246-1.266-5.115-2.628-8.19-3.883-3.071-1.253-6.272-2.37-9.169-3.167C45.1 58.408 42.711 58 41.167 58c-3.21 0-6.677 1.223-9.994 3.119M101.79 74.68l-.011-.002z"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_dd_211_443"
        
        
        x="-4"
        y="-12"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.756863 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_211_443"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.219608 0 0 0 0 0.85098 0 0 0 1 0"></feColorMatrix>
        <feBlend
          in2="effect1_dropShadow_211_443"
          result="effect2_dropShadow_211_443"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_211_443"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

export const LeftSvgIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="76"
    height="64"
    fill="none"
    viewBox="0 0 76 64"
  >
    <foreignObject width="160" height="160" x="-45" y="-46">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        clipPath="url(#bgblur_0_861_793_clip_path)"
        style={{ backdropFilter: "blur(25px)", height: "100%", width: "100%" }}
      ></div>
    </foreignObject>
    <g data-figma-bg-blur-radius="50" filter="url(#filter0_di_861_793)">
      <circle
        cx="35"
        cy="34"
        r="30"
        fill="#2E2F38"
        fillOpacity="0.6"
        shapeRendering="crispEdges"
      ></circle>
    </g>
    <path
      stroke="#B8B7B6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M45 34H25m0 0 7.5-7.5M25 34l7.5 7.5"
    ></path>
    <defs>
      <clipPath id="bgblur_0_861_793_clip_path" transform="translate(45 46)">
        <circle cx="35" cy="34" r="30"></circle>
      </clipPath>
      <filter
        id="filter0_di_861_793"
        width="160"
        height="160"
        x="-45"
        y="-46"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feMorphology
          in="SourceAlpha"
          radius="9"
          result="effect1_dropShadow_861_793"
        ></feMorphology>
        <feOffset dx="3" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="8.2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_861_793"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_861_793"
          result="shape"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="0.5" dy="0.5"></feOffset>
        <feComposite
          in2="hardAlpha"
          k2="-1"
          k3="1"
          operator="arithmetic"
        ></feComposite>
        <feColorMatrix values="0 0 0 0 0.828564 0 0 0 0 0.747068 0 0 0 0 0.980833 0 0 0 0.25 0"></feColorMatrix>
        <feBlend in2="shape" result="effect2_innerShadow_861_793"></feBlend>
      </filter>
    </defs>
  </svg>
);

export const RightSvgIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="65"
    height="64"
    fill="none"
    viewBox="0 0 65 64"
  >
    <foreignObject width="160" height="160" x="-45" y="-46">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        clipPath="url(#bgblur_0_861_797_clip_path)"
        style={{ backdropFilter: "blur(25px)", height: "100%", width: "100%" }}
      ></div>
    </foreignObject>
    <g data-figma-bg-blur-radius="50" filter="url(#filter0_di_861_797)">
      <circle
        cx="30"
        cy="30"
        r="30"
        fill="#2E2F38"
        fillOpacity="0.6"
        shapeRendering="crispEdges"
        transform="matrix(-1 0 0 1 65 4)"
      ></circle>
    </g>
    <path
      stroke="#B8B7B6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M25 34h20m0 0-7.5-7.5M45 34l-7.5 7.5"
    ></path>
    <defs>
      <clipPath id="bgblur_0_861_797_clip_path" transform="translate(45 46)">
        <circle
          cx="30"
          cy="30"
          r="30"
          transform="matrix(-1 0 0 1 65 4)"
        ></circle>
      </clipPath>
      <filter
        id="filter0_di_861_797"
        width="160"
        height="160"
        x="-45"
        y="-46"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feMorphology
          in="SourceAlpha"
          radius="9"
          result="effect1_dropShadow_861_797"
        ></feMorphology>
        <feOffset dx="3" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="8.2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_861_797"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_861_797"
          result="shape"
        ></feBlend>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dx="0.5" dy="0.5"></feOffset>
        <feComposite
          in2="hardAlpha"
          k2="-1"
          k3="1"
          operator="arithmetic"
        ></feComposite>
        <feColorMatrix values="0 0 0 0 0.828564 0 0 0 0 0.747068 0 0 0 0 0.980833 0 0 0 0.25 0"></feColorMatrix>
        <feBlend in2="shape" result="effect2_innerShadow_861_797"></feBlend>
      </filter>
    </defs>
  </svg>
);