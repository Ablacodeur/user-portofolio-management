--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: connection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.connection (
    id integer NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(100)
);


ALTER TABLE public.connection OWNER TO postgres;

--
-- Name: connection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.connection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.connection_id_seq OWNER TO postgres;

--
-- Name: connection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.connection_id_seq OWNED BY public.connection.id;


--
-- Name: profils; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profils (
    id integer NOT NULL,
    email character varying(250),
    job character varying(150),
    sudoname character varying(100),
    about_you character varying(1000),
    profil_image character varying(300),
    user_id integer
);


ALTER TABLE public.profils OWNER TO postgres;

--
-- Name: profils_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profils_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profils_id_seq OWNER TO postgres;

--
-- Name: profils_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profils_id_seq OWNED BY public.profils.id;


--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id integer NOT NULL,
    project_name character varying(400),
    demo_url character varying(400),
    repo_url character varying(400),
    description character varying(1000),
    project_image character varying(500),
    user_id integer NOT NULL
);


ALTER TABLE public.project OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- Name: connection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connection ALTER COLUMN id SET DEFAULT nextval('public.connection_id_seq'::regclass);


--
-- Name: profils id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profils ALTER COLUMN id SET DEFAULT nextval('public.profils_id_seq'::regclass);


--
-- Name: project id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- Data for Name: connection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.connection (id, email, password) FROM stdin;
12	test@gmail.com	$2b$10$Kb3IGtd5NykTRPHld33rH.TpPSu.yfZXLWltS4fgm5wVfMFDPlHYm
13	test2@gmail.com	$2b$10$gfnSM5S9mlK0PCCXzG0UgeSaMQ6kuAKNUf1vp1PKeApix35Pd/782
14	test3@gmail.com	$2b$10$Zk5fx/lolkMJ0xo0cILLvu6OPZ8kitZqo7RQDj0ZqnT8Ot7u8S2X.
20	test5@gmail.com	$2b$10$uPFvkAjkNQiroi21QL0dQ.biboHMV6J84mK/hCb9BK/CSp2Tkap9e
21	tes4@gmail.com	$2b$10$nUv0hpkO6nHr7XBNd8l0H.vYP/LEJjrRYOb7taR5qi4QFg7QK5hJO
22	test6@gmail.com	$2b$10$2Cv7p5h8VksoWUJtdNTQnuI/KOQEYeMbvuf1XEy7eBV9AcH0hcWKO
23	agbolivicky@gmail.com	\N
24	test7@gmail.com	$2b$10$baNgCYZubrLgYMK.xFYa3.vBCU/dsZm.uvhSsdAVNi.X.mIOfY5IK
29	test8@gmail.com	$2b$10$oskixy5HmmM/SJl10NAAIeskW4TqvLT0l6/fURSOrHYVR0buXjSKC
31	test9@gmail.com	$2b$10$7ECMYCT6Mke3oyrMXfUzfe2HvY6SmY32wJ.XDwYlU1z8b2.yRPF7W
\.


--
-- Data for Name: profils; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profils (id, email, job, sudoname, about_you, profil_image, user_id) FROM stdin;
1	\N	singer	serge Gainsbourg	couleur café .	\N	\N
2	\N	sing	Gainsbourg	couleur .	\N	\N
7	tes4@gmail.com	singer	Randy Travis	Operator, please connect with 1982	/uploads/632bcb18fec4887edae42ff46793d4f7	21
8	test5@gmail.com	singer	Don williams	i believe in you	/uploads/f19a46054617d246ba78f9592585c2fb	20
3	test7@gmail.com	singer	Tim McGraw	i want some mor of it	/uploads/bce24674b1948f2c4859ea54bb7a94af	\N
4	test7@gmail.com	singer	Tim McGraw	i want some mor of it	/uploads/bce24674b1948f2c4859ea54bb7a94af	\N
5	test7@gmail.com	singer	Tim McGraw	i want some mor of it	/uploads/bce24674b1948f2c4859ea54bb7a94af	24
6	test3@gmail.com	country music	Mark chesnutt	Brother jukebox,sister wine,mother freedoom,father time... since you left me by myself, you're the only family i got ti live	/uploads/d6531e9b48db9156bb0784a009341d73	14
9	agbolivicky@gmail.com	singer	Mark chesnutt	jukebox doki doke	/uploads/2985209bb5e17f1f1ed9aac0bc50d357	23
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (id, project_name, demo_url, repo_url, description, project_image, user_id) FROM stdin;
26	love	 https://imaga.app/demoat	 https://learn.app/gitsight	anime .ok docikulist ok ok	/uploads/432fb0daa38d10df11a04b738dd03f25	24
32	fout	 https://fout.io	 https://fout.app/git	fout	/uploads/2f99f7dcb99c8631331bea4eda0e35e6	14
34	orange	https://orange.app	 https://orange.app/git	orange is a new black	/uploads/0e64d6ef6f68b2ed52826c9c3f34808a	14
35	automne	 https://left.app/demo	 https://left.app/git	Fall is around the corner	/uploads/15e885a63acf133f81ddbf4ea7c1df4f	14
36	Summer	 https://summer.app/demo	 https://summer.app/git	Still summer here 	/uploads/92fabd515d1e6093f1aba0ce3375f72e	14
29	Documentaire	https://doc.app	 https://learnyub.app/git	just to learn new stuffy	/uploads/34dc2e2aed4b8c848816e49e85274eb2	23
27	You've got to learn	 https://learn.app/demo	 https://lrnti.app/git	classification decimale de dewey	/uploads/c50f22b17069efc5f278a491a8651be9	23
\.


--
-- Name: connection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.connection_id_seq', 31, true);


--
-- Name: profils_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profils_id_seq', 9, true);


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 38, true);


--
-- Name: connection connection_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connection
    ADD CONSTRAINT connection_email_key UNIQUE (email);


--
-- Name: connection connection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connection
    ADD CONSTRAINT connection_pkey PRIMARY KEY (id);


--
-- Name: profils profils_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profils
    ADD CONSTRAINT profils_pkey PRIMARY KEY (id);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

