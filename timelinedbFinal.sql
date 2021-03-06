PGDMP     &    	            
    x         
   timelinedb    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394 
   timelinedb    DATABASE     n   CREATE DATABASE timelinedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE timelinedb;
                postgres    false            �            1259    16395    mediaauthor    TABLE     w   CREATE TABLE public.mediaauthor (
    id integer NOT NULL,
    mediaid integer NOT NULL,
    username text NOT NULL
);
    DROP TABLE public.mediaauthor;
       public         heap    postgres    false            �            1259    16401    MediaAuthor_id_seq    SEQUENCE     �   ALTER TABLE public.mediaauthor ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."MediaAuthor_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �            1259    16403    media    TABLE     *  CREATE TABLE public.media (
    mediaid integer NOT NULL,
    mediatype text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    approved boolean NOT NULL,
    creator text NOT NULL,
    rating real,
    proposededitmediaid integer,
    unidate text,
    pubdate text NOT NULL
);
    DROP TABLE public.media;
       public         heap    postgres    false            �            1259    16409    Media_id_seq    SEQUENCE     �   ALTER TABLE public.media ALTER COLUMN mediaid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Media_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16411    users    TABLE     r   CREATE TABLE public.users (
    username text NOT NULL,
    password text NOT NULL,
    admin boolean NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    16403    media 
   TABLE DATA           �   COPY public.media (mediaid, mediatype, title, description, approved, creator, rating, proposededitmediaid, unidate, pubdate) FROM stdin;
    public          postgres    false    202   �       �          0    16395    mediaauthor 
   TABLE DATA           <   COPY public.mediaauthor (id, mediaid, username) FROM stdin;
    public          postgres    false    200   �       �          0    16411    users 
   TABLE DATA           :   COPY public.users (username, password, admin) FROM stdin;
    public          postgres    false    204   �       �           0    0    MediaAuthor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."MediaAuthor_id_seq"', 38, true);
          public          postgres    false    201            �           0    0    Media_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Media_id_seq"', 36, true);
          public          postgres    false    203            0           2606    16418    mediaauthor MediaAuthor_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.mediaauthor
    ADD CONSTRAINT "MediaAuthor_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.mediaauthor DROP CONSTRAINT "MediaAuthor_pkey";
       public            postgres    false    200            2           2606    16420    media Media_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.media
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (mediaid);
 <   ALTER TABLE ONLY public.media DROP CONSTRAINT "Media_pkey";
       public            postgres    false    202            4           2606    16422    users Users_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (username);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT "Users_pkey";
       public            postgres    false    204            �   �  x��V�r�8<S_1{�EfY�_�͎��^�QV*�l�2"G$V$�@)گ�Pr��q�V�`P�`�{����uk#�,�����z�2��B�n�^b�-��Z�VJ��uK��r��f)�j��.)):�M�ڵB���D=���s�
K���]E��%��3oĖt�3�8�]�.-�.��}k�Ul�q�-�眾_w1�Y�ވ��]W 3F�;�x��ПJ��y>ɾ�ˎ���K6��O�N�'��(�����l�!��87����^�zق�f�Ыve��3>��q��5z^K��fj��:�0U�! ��q�.����*n��7��pk���M�dnVݼ1ENc�	gQ��k����q�,��5��P���=Mu��F����p4L�Y�ZSdW�c����AB���qsk�����E��3�9D*�i���֖��(��n�C�yVs	p^#)�Y�
��[=�� P�n!(�LQ �2䤤\6\,i��a:�a��0LD�Zz\[�y�:�H�Rΰ�7ڌs������6�q>�c2!t��n�K��K��U���hJ�=�ǩsF��$�;�D�x���ʄ­E��L�����i�O\������ԟ��!���vh ���6�kh��U�R���s4A^(�i�F�Z��&}������Գ]�P�ٕ�BJ��aX���Xڪ��f�b�@:����� ߵ9t[�4M�\M�b�����;��{�����q����q�k|�tnͯ��d/6���Ѷ�1�CH��[�m�(ϥ�.����S�8K]���(p�g��6���b�E��d}�5E��Ѕ�e���19ދ��9�&'ϙ��>AM��[��J��D�D��GOh�������fao�r!Y��@���I�zz;HNh�X=`�b��f�z;�􄍦өv�h:��Tn ���)��Uۊぶi�$�M��٪�ioO��?~����Q�`�/�iCvC��BG�Ӎ&P8��s�	��@��cJ4�#U〝���$9�s�`��Z����
E��"��u���	����kn��q?��{��S������Ց��d_�Z�Rqj9C���4��Ƨ[j�!U(8��OC
;��viܻ
#���tA9�?�i*�%n��Db	�����X:î�J�L����]8߂��������i ��g��'Y`/؂��A �LM�M�tq%�=e�O��ҟChHo]��6h����5���!�sE�h�_�I�����3�<��$��d��VR�^���]Aańڬ���f�͔�>TlJ�3�1ˇ=��T�0#rm
e��bL�؏��&����m����i_[�:;�=���g^�I�}@��\A�%��Pg�Q�5(��Za��n��HIzL̵}J n�S�a��[�Fx��~���-tB��GPy�X�s�y��) ��.�G�_z'��K��$��o^��M�_�G�7��|0��]��      �   \   x�=�1�0C��9�qK�]X��� �����)_rϽ]�>����O!ԥ34��-���
Kn��J�,�'Xj/�A���� "/^&�      �   (   x�+-N-�,H,.�L�JL����L�/IM��,����� ��	�     