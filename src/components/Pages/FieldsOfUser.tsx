import { useEffect, useState, useMemo } from 'react';
import { useFieldOfUser } from '../../hooks/FetchFields';
import { response } from '../../types';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import CenteredPage from '../CenteredPage';
import { Link } from 'react-router-dom';
import FieldItemBox from '../ui/FieldItemBox';
import FieldItem from "../ui/FieldItem";
import LoadingPage from './LoadingPage';

interface Props {
  userID: string;
}

export default function FieldsOfUser({ userID }: Props) {
  const { data, isLoading } = useFieldOfUser(userID);
  const [fields, setFields] = useState<response[]>([]);

  // Update fields when data changes
  useEffect(() => {
    console.log(data);
    if (data) {
      setFields(data.field);
    } else {
      setFields([]);
    }
  }, [data]);

  // Memoized JSX for fields
  const mobileFieldItems = useMemo(() => {
    return fields.map((item: response) => (
      <FieldItem
        _id={item._id}
        key={item._id}
        type={item.type}
        address={item.address}
        className="my-2"
        Name={item.title}
        Icon={item.coverImage}
        location={item.location}
        price={item.price}
      />
    ));
  }, [fields]);

  const desktopFieldItems = useMemo(() => {
    return fields.map((item: response) => (
      <FieldItemBox
        _id={item._id}
        key={item._id}
        type={item.type}
        address={item.address}
        className="my-2"
        Name={item.title}
        Icon={item.coverImage}
        location={item.location}
        price={item.price}
      />
    ));
  }, [fields]);

  if (isLoading) {
    return (
      <LoadingPage />
    );
  }

  return fields.length !== 0 ? (
    <>
      <p className="text-center font-bold">Your managed Fields</p>
      <div className="static md:hidden">{mobileFieldItems}</div>
      <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {desktopFieldItems}
      </div>
    </>
  ) : (
    <CenteredPage>
      <h4 className="text-6xl mb-5 text-center text-orange-700 dark:text-zinc-200 font-medium agu-display">
        You have no Fields
      </h4>
      <Link to="/">
        <p className="underline underline-offset-4 text-3xl mb-5 text-center text-blue-600 text-opacity-70 font-medium">
          Browse <KeyboardTabIcon />
        </p>
      </Link>
    </CenteredPage>
  );
}
