import { Card, CardHeader, PageSection, Select, SelectOption, SelectVariant, Text, TextContent, TextVariants, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core'
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { useMemo, useState } from 'react';
import Layout from '../components/Layout'

enum Weekday {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

const buildCalendar = (year: number, month: number) => {
  const defaultDate = new Date(year, month);
  const firstDayOfWeek = new Date(defaultDate);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
  // We will always show 6 weeks like google calendar
  // Assume we just want the numbers for now...
  const calendarWeeks = [];
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      const date = new Date(firstDayOfWeek);
      week.push({
        date
      });
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
    }
    calendarWeeks.push(week);
  }

  return calendarWeeks;
}

const monthFormat = date => date.toLocaleDateString(undefined, { month: 'long' });
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthNum => new Date(1990, monthNum)).map(monthFormat);

const IndexPage = () => {

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth());
  const calendar = useMemo(() => buildCalendar(2022, selectedMonth), [selectedMonth]);

  return (
    <Layout title="Birthday Box Booking">
      <PageSection>
        <TextContent>
          <Text component={TextVariants.h1}>Book the Birthday Box!</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem widths={{default: "140px"}}>
              <Select
                variant={SelectVariant.single}
                isOpen={isSelectOpen}
                onToggle={() => setIsSelectOpen(!isSelectOpen)}
                onSelect={(_ev, month) => {
                  setTimeout(() =>{
                    setIsSelectOpen(false);
                    setSelectedMonth(Number(month as String));
                }, 0)
                }}
                selections={months[selectedMonth]}
              >
                {months.map((month, index) => (
                  <SelectOption key={index} value={index}>
                    {month}
                  </SelectOption>
                ))}
              </Select>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <TableComposable variant={"compact"} borders={false}>
          <Thead>
            <Tr>
              <Th>Sunday</Th>
              <Th>Monday</Th>
              <Th>Tuesday</Th>
              <Th>Wednesday</Th>
              <Th>Thursday</Th>
              <Th>Friday</Th>
              <Th>Saturday</Th>
            </Tr>
          </Thead>
          <Tbody>
            {calendar.map((week, index) => (
              <Tr key={index}>
                {week.map(({ date }, index) => (
                  <Td key={index} dataLabel={Weekday[index]}>
                    <Card>
                      <CardHeader>
                        {date.getDate()}
                      </CardHeader>
                    </Card>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </Layout>
  )
}

export default IndexPage