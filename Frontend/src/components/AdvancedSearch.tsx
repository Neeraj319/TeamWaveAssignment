import { useState } from "react";
import { Button } from "react-bootstrap";

export function AdvancedSearch(): JSX.Element {
    const [page, setPage] = useState("");
    const [pagesize, setPagesize] = useState("");
    const [toDate, setToDate] = useState(0);
    const [max, setMax] = useState(0);
    const [notTagged, setNotTagged] = useState("");
    const [tagged, setTagged] = useState("");
    const [order, setOrder] = useState("desc");
    const [sort, setSort] = useState("activity");
    const [intTitle, setIntTitle] = useState("");
    const [formDate, setFormDate] = useState(0);
    const [min, setMin] = useState(0);
    return (<>
        page
        <input className="form-control" value={page} onChange={(e) => {
            setPage(e.target.value)
        }} type="number" />
        <br />
        pagesize <input className="form-control" value={pagesize} onChange={(e) => {
            setPagesize(e.target.value)
        }} type="number" />
        <br />
        todate <input className="form-control" onChange={(e) => {
            let date_to_string = new Date(e.target.value).getTime()
            setToDate(date_to_string)
        }} type="date" />
        <br />
        max <input className="form-control" onChange={(e) => {
            let date_to_string = new Date(e.target.value).getTime()
            setMax(date_to_string)
        }} type="date" />
        <br />
        not tagged <input className="form-control" value={notTagged} onChange={(e) => {
            setNotTagged(e.target.value)
        }} type="text" />
        <br />
        tagged* <input className="form-control" value={tagged} onChange={(e) => {
            setTagged(e.target.value)
        }} type="text" />
        <br />
        order <input className='form-control' value={order} onChange={(e) => {
            setOrder(e.target.value)
        }} type="text" />
        <br />
        sort <input className='form-control' value={sort} onChange={(e) => {
            setSort(e.target.value)
        }} type="text" />
        <br />
        intitle <input className="form-control" value={intTitle} onChange={(e) => {
            setIntTitle(e.target.value)
        }} type="text" />
        <br />
        formdate <input className="form-control" onChange={(e) => {
            let date_to_string = new Date(e.target.value).getTime()
            setFormDate(date_to_string)
        }} type="date" />
        <br />
        min <input className="form-control" onChange={(e) => {
            let date_to_string = new Date(e.target.value).getTime()
            setMin(date_to_string)
        }} type="date" />
        <br />

        <Button onClick={() => {
            console.log(page, pagesize, toDate, max, notTagged, tagged, order, sort, intTitle, formDate, min)
        }
        }>Search</Button>
    </>);
}

